/* Lazy-loaded Spline scene wrapper for the exact robot hero.
 *
 * Spline's runtime only reacts to pointer events that land on its own
 * <canvas>, so by default the robot only "looks at" the cursor while
 * the mouse is hovering inside that small box. To make it track the
 * cursor across the whole page, we attach one window-level pointermove
 * listener (once the scene has loaded) and re-dispatch a synthetic
 * pointer event onto the Spline canvas, with the coordinates clamped
 * onto the canvas's own bounding box.
 */
'use client'

import { Suspense, lazy, useCallback, useEffect, useRef } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const lastPoint = useRef<{ x: number; y: number } | null>(null)
  const attachedRef = useRef(false)

  const forwardToCanvas = useCallback(() => {
    rafRef.current = null
    const canvas = wrapperRef.current?.querySelector('canvas')
    const point = lastPoint.current
    if (!canvas || !point) return

    const rect = canvas.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return

    // Clamp onto the canvas bounds so the robot eases toward an edge
    // instead of snapping when the real cursor is far outside its box.
    const clientX = Math.min(Math.max(point.x, rect.left), rect.right)
    const clientY = Math.min(Math.max(point.y, rect.top), rect.bottom)

    canvas.dispatchEvent(
      new PointerEvent('pointermove', {
        clientX,
        clientY,
        bubbles: true,
        cancelable: true,
        pointerId: 1,
        pointerType: 'mouse',
      })
    )
  }, [])

  const handleWindowPointerMove = useCallback(
    (event: PointerEvent) => {
      lastPoint.current = { x: event.clientX, y: event.clientY }
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(forwardToCanvas)
      }
    },
    [forwardToCanvas]
  )

  const handleSplineLoad = useCallback(() => {
    if (attachedRef.current) return
    attachedRef.current = true
    window.addEventListener('pointermove', handleWindowPointerMove)
  }, [handleWindowPointerMove])

  useEffect(() => {
    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove)
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleWindowPointerMove])

  return (
    <div ref={wrapperRef} className="h-full w-full">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline scene={scene} className={className} onLoad={handleSplineLoad} />
      </Suspense>
    </div>
  )
}

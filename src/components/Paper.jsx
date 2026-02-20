import { useRef, useState, useEffect } from 'react'

let highestZ = 1

export default function Paper({ data }) {
  const paperRef = useRef(null)
  const [zIndex, setZIndex] = useState(1)
  
  const stateRef = useRef({
    holdingPaper: false,
    currentPaperX: Math.random() * 100 - 50,
    currentPaperY: Math.random() * 100 - 50,
    rotation: Math.random() * 30 - 15,
    mouseX: 0,
    mouseY: 0,
    prevMouseX: 0,
    prevMouseY: 0,
    mouseTouchX: 0,
    mouseTouchY: 0,
    rotating: false,
    velX: 0,
    velY: 0,
    rafId: null
  })

  const updateTransform = () => {
    const paper = paperRef.current
    if (!paper) return
    
    const state = stateRef.current
    const transform = `translate(calc(-50% + ${state.currentPaperX}px), calc(-50% + ${state.currentPaperY}px)) rotateZ(${state.rotation}deg)`
    paper.style.transform = transform
  }

  const updatePosition = (x, y) => {
    const state = stateRef.current
    
    if (!state.rotating) {
      const velX = x - state.prevMouseX
      const velY = y - state.prevMouseY
      
      if (state.holdingPaper && !state.rotating) {
        state.currentPaperX += velX
        state.currentPaperY += velY
        state.mouseX = x
        state.mouseY = y
        state.prevMouseX = x
        state.prevMouseY = y
      }
    }

    if (state.rotating) {
      const dirX = x - state.mouseTouchX
      const dirY = y - state.mouseTouchY
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY)
      const dirNormalizedX = dirX / dirLength
      const dirNormalizedY = dirY / dirLength
      const angle = Math.atan2(dirNormalizedY, dirNormalizedX)
      state.rotation = (360 + Math.round((180 * angle) / Math.PI)) % 360
    }

    // Cancel previous RAF if exists
    if (state.rafId) {
      cancelAnimationFrame(state.rafId)
    }
    
    state.rafId = requestAnimationFrame(updateTransform)
  }

  const handleMouseDown = (e) => {
    const state = stateRef.current
    if (state.holdingPaper) return
    
    e.preventDefault()
    state.holdingPaper = true
    state.mouseTouchX = e.clientX
    state.mouseTouchY = e.clientY
    state.prevMouseX = e.clientX
    state.prevMouseY = e.clientY
    
    setZIndex(++highestZ)
  }

  const handleTouchStart = (e) => {
    const state = stateRef.current
    if (state.holdingPaper) return
    
    e.preventDefault()
    const touch = e.touches[0]
    state.holdingPaper = true
    state.mouseTouchX = touch.clientX
    state.mouseTouchY = touch.clientY
    state.prevMouseX = touch.clientX
    state.prevMouseY = touch.clientY
    
    setZIndex(++highestZ)
  }

  const handleMouseMove = (e) => {
    if (stateRef.current.holdingPaper) {
      e.preventDefault()
    }
    updatePosition(e.clientX, e.clientY)
  }

  const handleTouchMove = (e) => {
    if (stateRef.current.holdingPaper) {
      e.preventDefault()
    }
    if (e.touches[0]) {
      updatePosition(e.touches[0].clientX, e.touches[0].clientY)
    }
  }

  const handleMouseUp = (e) => {
    const state = stateRef.current
    if (state.holdingPaper) {
      e.preventDefault()
    }
    state.holdingPaper = false
    state.rotating = false
  }

  const handleTouchEnd = (e) => {
    const state = stateRef.current
    if (state.holdingPaper) {
      e.preventDefault()
    }
    state.holdingPaper = false
    state.rotating = false
  }

  useEffect(() => {
    const paper = paperRef.current
    if (!paper) return

    document.addEventListener('mousemove', handleMouseMove)
    paper.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    paper.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      paper.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      
      document.removeEventListener('touchmove', handleTouchMove)
      paper.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      
      if (stateRef.current.rafId) {
        cancelAnimationFrame(stateRef.current.rafId)
      }
    }
  }, [])

  const classes = ['paper', data.className].filter(Boolean).join(' ')
  const state = stateRef.current
  const initialTransform = `translate(calc(-50% + ${state.currentPaperX}px), calc(-50% + ${state.currentPaperY}px)) rotateZ(${state.rotation}deg)`

  return (
    <div
      ref={paperRef}
      className={classes}
      style={{
        transform: initialTransform,
        zIndex: zIndex
      }}
    >
      {data.content.map((item, idx) => {
        const isTanishqaa = item.text.toLowerCase().includes('tanishqaa')

        return (
          <p
            key={idx}
            className={isTanishqaa ? 'tanishqaa-animate' : ''}
            style={{ color: item.color }}
          >
            {item.text}
          </p>
        )
      })}
      {data.image && (
        <img
          src={data.image}
          alt="memory"
          style={{ height: data.imageHeight }}
        />
      )}
    </div>
  )
}



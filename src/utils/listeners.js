import { onMounted, onUnmounted } from 'vue'

export function useKeyListener(callback, keys = []) {
    function handleKey(e) {
        if (keys.length === 0 || keys.includes(e.key)) {
        callback(e)
        }
    }

    onMounted(() => {
        window.addEventListener('keydown', handleKey)
    })

    onUnmounted(() => {
        window.removeEventListener('keydown', handleKey)
    })
}

export function useTimeOutListener(callback, delay = 5000) {
    let timer = null

    const resetAndStart = () => {
      clearTimeout(timer)
      timer = setTimeout(callback, delay)
    }
  
    onMounted(() => {
      resetAndStart()
    })
  
    onUnmounted(() => {
      clearTimeout(timer)
    })

    return { reset: resetAndStart }
}

export function useMouseMovementListener(callback, threshold) {
    let startX = null
    let startY = null
  
    function handleMouseMove(e) {
      if (startX === null || startY === null) {
        startX = e.clientX
        startY = e.clientY
        return
      }
  
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      const distance = Math.sqrt(dx * dx + dy * dy)
  
      if (distance >= threshold) {
        callback({ dx, dy, distance })
        startX = e.clientX
        startY = e.clientY
      }
    }
  
    onMounted(() => {
      window.addEventListener('mousemove', handleMouseMove)
    })
  
    onUnmounted(() => {
      window.removeEventListener('mousemove', handleMouseMove)
    })
}
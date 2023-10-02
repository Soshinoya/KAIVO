import useFullscreen from './useFullscreen'

function useFullscreenExample() {
  const onFullS = isFull => console.log(isFull);
  const { element, triggerFull, exitFull } = useFullscreen(onFullS)

  return (
    <div className="useFullscreenExample">
      <h1>This is useFullscreen custom hook</h1>
      <div ref={element}>
        <img onClick={triggerFull} src="https://images.unsplash.com/photo-1673205194019-55ac9f0a0899?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60" alt="" />
        <button onClick={exitFull}>exit fullscreen</button>
      </div>
    </div>
  )
}

export default useFullscreenExample
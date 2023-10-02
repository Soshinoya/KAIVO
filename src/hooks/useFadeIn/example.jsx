import useFadeIn from './useFadeIn'

function useFadeInExample() {
    const fadeInH1 = useFadeIn(1, 1)
    const fadeInP = useFadeIn(1, 2)

    return (
        <div className="useFadeInExample">
            <h1 {...fadeInH1}>This is useFadeIn custom hook</h1>
            <p {...fadeInP}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum, ratione soluta ullam necessitatibus, maiores asperiores<br /> dolores explicabo vitae nam at suscipit. Blanditiis, suscipit! Sit ab magni blanditiis nisi quod. Libero?</p>
        </div>
    )
}

export default useFadeInExample
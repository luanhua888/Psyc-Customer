import React from 'react'

function CountUp() {

    const [count, setCount] = React.useState(0)

    const increment = () => {

        setCount(count + 1)


    }

    React.useEffect(() => {
        const interval = setInterval(increment, 1000)
        return () => clearInterval(interval)
    }, [count])
    

  return (
    <div>
        <h1>
        {/* // hiển thị phút và giây từ count  */}
        {Math.floor(count / 60)}:{count % 60}
          

        </h1>
    </div>
  )
}

export default CountUp
const canvas = document.querySelector('canvas');
const context  = canvas.getContext('2d');

canvas.width = 500
canvas.height = 500


requestAnimationFrame(tick)

let pTimestamp = 0;
let angle = 0;

function tick(timestamp){
    requestAnimationFrame(tick)

    const diff  = timestamp - pTimestamp
    pTimestamp  = timestamp

    angle += Math.PI * 0.001;
    context.clearRect(0, 0, canvas.width, canvas.height)

    console.log(angle)
    context.beginPath()
    context.arc(
        canvas.width / 2 + 150 * Math.cos(angle),
        canvas.height / 2 + 150 * Math.sin(angle),
        5, 
        0, Math.PI * 2
    )
    context.fillStyle = "green"
    context.fill()

}


// context.rect(90, 90, 400, 400)
// context.strokeStyle = 'black'
// context.fillStyle = 'blue'
// context.lineCap = 'round'
// context.lineJoin = 'round'
// context.lineWidth = 15
// context.fill()
// context.stroke()

// context.beginPath()
// context.arc(290,290, 130,  -Math.PI / 4, 6 * Math.PI / 4, )
// context.strokeStyle = 'red'
// context.fillStyle = 'yellow'
// context.lineWidth = 5
// context.fill()
// context.stroke()


// context.lineTo(200, 400)
// context.lineTo(300, 100)


// context.beginPath()
// context.moveTo(0, 500)
// context.quadraticCurveTo(0, 80, 500, 60, 500, 0)
// context.stroke()


// context.font = "50px serif"
// context.fillText('hello world', 50, 50)
const keys = require('./keys')
const redis = require('redis')

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
})

const sub = redisClient.duplicate()

sub.on('message', (channel, value) => {
    redisClient.hset('values', value, fibTailRec(parseInt(value)))
})

sub.subscribe('insert')


function fib(index) {
    if (index <= 2) return 1
    else return fib(index - 1) + fib(index - 2)
}

function fibTailRec(index){
    function fibHelper(index, current, previous) {
        if (index <= 2) return current
        else return fibHelper(index - 1, current + previous, current)
    }

    return fibHelper(index, 1, 1)
}
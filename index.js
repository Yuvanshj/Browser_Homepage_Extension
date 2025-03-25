setTimeout(() => {
  document.querySelector('html').style.display = 'block'
}, 900);

const html = document.querySelector('html')
const authorName = document.getElementById('name')
const coinName = document.getElementById('crypto') 
const coinIcon = document.getElementById('icon')
const coinPrice = document.getElementById('price')
const time = document.getElementById('time')
const cryptoCurrency = 'dogecoin'
const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-5Ap8J3FwwUjNFZX79KcMWyk8'}
};


async function getCrypto() {
  
await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoCurrency}`)

.then(function (res) {
    return res.json()
  })

.then(function (data) {
    coinName.innerText = data.id 
    coinIcon.innerHTML = `<img id='img' src="${data.image.small}" >`
    coinPrice.innerHTML = `<p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
            `
  })

.catch(function () {
  console.error('error is error')
  })


}



async function getBg() { 
  await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=night')
  
  .then(function (res) {
      return res.json()
    })
  
  .then(function (data) {
  
      authorName.innerText = `By:${data.user.name}`
      html.style.backgroundImage = `url(${data.urls.full})`
    })
  
  .catch(function () {
      html.style.backgroundImage = `url('https://wallpapercave.com/wp/wp9151165.jpg')`
      document.getElementById('name').innerText = `periclytos`
  })
}


function dispTime() {
    const date = new Date().toLocaleTimeString("en-US" , {timeStyle : "short"})
    time.innerText = date    
}

navigator.geolocation.getCurrentPosition( 
  async(position) => {
  await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
      .then(res => {
          if (!res.ok) {
              throw Error("Weather data not available")
          }
          return res.json()
      })
      .then(data => {
          const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          document.getElementById("weather").innerHTML = `
              <img src=${iconUrl} />
              <p class="weather-temp">${Math.round(data.main.temp)}º</p>
              <p class="weather-city">${data.name}</p>
          `
      })
      .catch(err => console.error(err))
});


getCrypto()
getBg()
setInterval(dispTime , 1000)
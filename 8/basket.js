const feturedItems = document.querySelector('.featuredItems')
const button = feturedItems.querySelectorAll('button')
const basketTotalValue = document.querySelector('.basketTotalValue')

let basketSet = new Set()
let basketArray = [];

button.forEach(el => el.addEventListener('click', event => {
    if (event.target.nodeName !== 'IMG') {
        const featuredItem = event.target.parentElement.parentElement.parentElement
        if (!basketArray.includes(featuredItem)) {
            featuredItem.count = 1
            basketSet.add(featuredItem)
            basketArray = Array.from(basketSet);
        } else {
            basketArray[basketArray.indexOf(featuredItem)].count++
        }
        renderNewProductInBasket(basketArray)

        basketTotalValue.textContent = basketArray.reduce((sum, el) => {
            const priceText = el.querySelector('.featuredPrice')
            const priceArr = [...priceText.innerText].map(el => {
                if ((el >= 0 && el < 10) || el === '.') {
                    return el
                }
            })
            const price = +priceArr.join('')
            return sum += el.count * price
        }, 0).toFixed(2)
    }
}))

document.querySelector('.cartIconWrap').addEventListener('click', event => {
    const basket = event.target.parentElement.parentElement.parentElement.querySelector('.basket')
    basket.classList.toggle('hidden')
})

function renderNewProductInBasket(basketArray) {
    document.querySelectorAll('.basketRow').forEach(el => el.remove())
    for (let el of basketArray) {
        const priceText = el.querySelector('.featuredPrice')
        const priceArr = [...priceText.innerText].map(el => {
            if ((el >= 0 && el < 10) || el === '.') {
                return el
            }
        })
        const price = +priceArr.join('')
        const productRow = `
    <div class="basketRow" data-id="${basketArray.indexOf(el)}">
      <div>${basketArray.indexOf(el) + 1}</div>
      <div>
        <span class="productCount">${el.count}</span> шт.
      </div>
      <div>$${price}</div>
      <div>
        $<span class="productTotalRow">${(price * el.count).toFixed(2)}</span>
      </div>
    </div>
    `;
        document.querySelector('.basketTotal').insertAdjacentHTML("beforebegin", productRow);
        const cartIconWrap = document.querySelector('.cartIconWrap').querySelector('span')
        cartIconWrap.textContent = basketArray.reduce((sum, el) => sum += el.count, 0)
    }
}
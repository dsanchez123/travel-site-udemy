import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
  constructor(els, thresholdPercent) {
    this.thresholdPercent = thresholdPercent
    this.itemstoReveal = els
    this.browserHeight = window.innerHeight
    this.hideInitially()
    this.scrollThrottle = throttle(this.calcCaller,200).bind(this)
    this.events()
  }

events() {
  window.addEventListener("scroll", this.scrollThrottle)
  window.addEventListener("resize", debounce(()=> {
    console.log("Resize just ran")
    this.browserHeight = window.innerHeight
  }, 333) )
}

calcCaller() {
  console.log("scroll function ran")
  this.itemstoReveal.forEach(el => {
    if (el.isRevealed == false) {
      this.calculateIfScrolledTo(el)
    }
  })
}

calculateIfScrolledTo(el) {
  if (window.scrollY + this.browserHeight > el.offsetTop) {
    console.log("Element was calculated")
    let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100
    if (scrollPercent < this.thresholdPercent) {
      el.classList.add("reveal-item--is-visible")
      el.isRevealed = true
      if (el.isLastItem) {
        window.removeEventListener("scroll",this.scrollThrottle)
      }
    }
  }
}

  hideInitially() {
    this.itemstoReveal.forEach(el => {
      el.classList.add("reveal-item")
      el.isRevealed = false
    })
    this.itemstoReveal[this.itemstoReveal.length - 1].isLastItem = true
  }
}
export default RevealOnScroll

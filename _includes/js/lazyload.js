/**
 * lazyload for google speed page
 * lazyload for background images
 */
window.addEventListener("load", function() {
  
  /**
   * wherever there is a class "lazyload" 
   * substitutes with a picture from data-bg="..."
   */
  var lazuloadItems = document.querySelectorAll(".lazyload-bg");
  lazuloadItems.forEach(function(item) {
    var getBgImg = item.getAttribute("data-bg");
    item.style.backgroundImage = `url('${getBgImg}')`;
  })

});

/**
 * need to lazyload images for tags <img />
 */
function support_format_webp()
{
 var elem = document.createElement('canvas');

 if (!!(elem.getContext && elem.getContext('2d')))
 {
  // was able or not to get WebP representation
  return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
 }
 else
 {
  // very old browser like IE 8, canvas not supported
  return false;
 }
}

/**
 * lazyload for tags <img />
 * Tutorial: https://imagekit.io/blog/lazy-loading-images-complete-guide/
 * placeholder generator: https://webdesign-master.ru/services/lazy/
 */
document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll("img.lazyload-img");    
  var lazyloadThrottleTimeout;
  var isSupportWebP = support_format_webp();
  
  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
    
    lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              var imgURL = img.dataset.src;
              
              /**
               * set alt format if browser doesn't support format webp
               */
              if(!isSupportWebP) {
                var getAltFormat = img.getAttribute("alt-format");
                imgURL = img.dataset.src.replace(/.webp/, `.${getAltFormat}`);
              }
              img.src = imgURL;

              /**
               * clean the garbage
               */
              if(img.classList > 1) img.classList.remove('lazyload-img');
              else img.removeAttribute("class");
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 20);
  }
  
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});
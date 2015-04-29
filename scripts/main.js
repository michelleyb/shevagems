
var makeBSS = function (el, options) {
    // a collection of all of the slideshows
    var $slideshows = document.querySelectorAll(el),
        
        // this slideshow instance 
        $slideshow = {},
        
        // the slideshow object we will use as prototype 
        Slideshow = {
            init: function (el, options) {
			    this.counter = 0; 
			    this.el = el;     
			    this.$items = el.querySelectorAll('figure'); 
			    this.numItems = this.$items.length; 
			    options = options || {};
			    options.auto = options.auto || false; 
			 
			    this.opts = {
			        auto: (typeof options.auto === "undefined") ? false : options.auto,
			        speed: (typeof options.auto.speed === "undefined") ? 1500 : options.auto.speed,
			        pauseOnHover: (typeof options.auto.pauseOnHover === "undefined") ? false : options.auto.pauseOnHover,
			        fullScreen: (typeof options.fullScreen === "undefined") ? false : options.fullScreen,
			        swipe: (typeof options.swipe === "undefined") ? false : options.swipe
			    };

			    this.$items[0].classList.add('bss-show');  
			    this.injectControls(el);
			    this.addEventListeners(el);
			 
			    if (this.opts.auto) {
			        this.autoCycle(this.el, this.opts.speed, this.opts.pauseOnHover);
			    }
			    if (this.opts.fullScreen) {
			        this.addFullScreen(this.el);
			    }
			    if (this.opts.swipe) {
			        this.addSwipe(this.el);
			    }
       		},
            showCurrent: function (i) {
			    if (i > 0) {
			        this.counter = (this.counter + 1 === this.numItems) ? 0 : this.counter + 1;
			    } else {
			        this.counter = (this.counter - 1 < 0) ? this.numItems - 1 : this.counter - 1;
			    }
			 
			    [].forEach.call(this.$items, function (el) {
			        el.classList.remove('bss-show');
			    });

			    this.$items[this.counter].classList.add('bss-show');
            },
            injectControls: function (el) {
			    var spanPrev = document.createElement("span"),
			        spanNext = document.createElement("span"),
			        docFrag = document.createDocumentFragment();
			 
			    spanPrev.classList.add('bss-prev');
			    spanPrev.classList.add('entypo-left-open-big');
			    spanNext.classList.add('bss-next');
			    spanNext.classList.add('entypo-right-open-big');
			 
			    //spanPrev.innerHTML = '<';
			    //spanNext.innerHTML = '>';
			    
			    docFrag.appendChild(spanPrev);
			    docFrag.appendChild(spanNext);
			    el.appendChild(docFrag);
            },
            addEventListeners: function (el) {
			    var that = this; 
			 
			    el.querySelector('.bss-next').addEventListener('click', function () {
			        that.showCurrent(1); 
			    }, false);
			 
			    el.querySelector('.bss-prev').addEventListener('click', function () {
			        that.showCurrent(-1); 
			    }, false);
			    
			    el.onkeydown = function (e) {
			        e = e || window.event;
			        
			        if (e.keyCode === 37) {
			            that.showCurrent(-1); 
			        } else if (e.keyCode === 39) {
			            that.showCurrent(1); 
			        }
			    };
            },
            autoCycle: function (el, speed, pauseOnHover) {
               var that = this,
			        interval = window.setInterval(function () {
			            that.showCurrent(1); 
			        }, speed);
			    
			    if (pauseOnHover) {
			        el.addEventListener('mouseover', function () {
			            interval = clearInterval(interval);
			        }, false);
			        
			        el.addEventListener('mouseout', function () {
			            interval = window.setInterval(function () {
			                that.showCurrent(1); 
			            }, speed);
			        }, false);
			    }  
            },
            addSwipe: function(el){
               var that = this,
			        ht = new Hammer(el);
			    ht.on('swiperight', function(e) {
			        that.showCurrent(-1); 
			    });
			    ht.on('swipeleft', function(e) {
			        that.showCurrent(1);
			    });
            },
        }; // end Slideshow object 
        
    /* make instances of Slideshow as needed,
       the forEach makes it so that we can create multiple
       slideshows if $slideshows is a list of DOM elements */                     
    [].forEach.call($slideshows, function (el) {
        /* instantiate a new object 
           using Slideshow as its prototype */      
        $slideshow = Object.create(Slideshow);
        /* call the init method on the new object
           and pass in the options we've set */
        $slideshow.init(el, options);
    });
};
 
/* set up the options for the slideshow
   we're about to create */
var opts = {
    auto : {
        speed : 5000, 
        pauseOnHover : true
    },
    fullScreen : false, 
    swipe : false
};
 
/* call makeBSS, passing in the element(s)
   we want to make a slideshow, and the
   options we have set */
makeBSS('.slideshow', opts);
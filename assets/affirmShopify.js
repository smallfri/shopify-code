
  <!--Debut -->
<!-- Affirm -->
	_affirm_config = {
	   public_api_key: "1UVF3U37809XCSVP",
	   script:          "https://cdn1.affirm.com/js/v2/affirm.js"
	};
	(function(l,g,m,e,a,f,b){var d,c=l[m]||{},h=document.createElement(f),n=document.getElementsByTagName(f)[0],k=function(a,b,c){return function(){a[b]._.push([c,arguments])}};c[e]=k(c,e,"set");d=c[e];c[a]={};c[a]._=[];d._=[];c[a][b]=k(c,a,b);a=0;for(b="set add save post open empty reset on off trigger ready setProduct".split(" ");a<b.length;a++)d[b[a]]=k(c,e,b[a]);a=0;for(b=["get","token","url","items"];a<b.length;a++)d[b[a]]=function(){};h.async=!0;h.src=g[f];n.parentNode.insertBefore(h,n);delete g[f];d(g);l[m]=c})(window,_affirm_config,"affirm","checkout","ui","script","ready");
	// Use your live public API Key and https://cdn1.affirm.com/js/v2/affirm.js script to point to Affirm production environment.
<!-- End Affirm -->;

let promo = {}
	
if(meta.page.pageType === "product"){
				    					promo = {
						onChange: "ProductSection-product-template",
						selector: ".price-item--regular",
						position: "beforeend",
						pageType: "product",
						fontSize: "12",
						logoType: "logo",
						logoColor: "blue",
						addCents: false,
					}
				    					pagePricingData(promo);
				    					}if(meta.page.pageType === "collection"){
				    					promo = {
						onChange: "",
						selector: ".price-item--regular",
						position: "beforeend",
						pageType: "category",
						fontSize: "12",
						logoType: "logo",
						logoColor: "blue",
						addCents: false,
					}
				    					pagePricingData(promo);
				    				  }promo = {
						onChange: "",
						selector: ".cart__subtotal",
						position: "afterend",
						pageType: "cart",
						fontSize: "12",
						logoType: "logo",
						logoColor: "blue",
						addCents: false,
					}
				    					pagePricingData(promo);




			promo = {
						onChange: "ProductSection-product-template",
						selector: ".price-item--regular",
						position: "beforeend",
						pageType: "product",
						fontSize: "12",
						logoType: "logo",
						logoColor: "blue",
						addCents: false,
					}
			setObserver(promo);

function setObserver(promo){

	setTimeout(function(){

		const targetNode = document.getElementById(promo.onChange);
		const config = { attributes: true, childList: true, subtree: true };

		const callback = function(mutationsList, observer) {
		    for(let mutation of mutationsList) {
		        if (mutation.type === "childList") {

			        
	                      
					changePrice(observer, promo ,null , function(){

						observer.observe(targetNode, config);
					});
					break;
		        }
		    }
		};

		const observer = new MutationObserver(callback);
		if(targetNode) observer.observe(targetNode, config);

	}, 1250);
}

function changePrice(observer, promo, styleArray, callback) { 

	observer.disconnect();
	
    pagePricingData(promo, styleArray, function(){
        
        setTimeout(callback, 1250);
    });
}
function pagePricingData(promo, styleArray, callback) {

  	let prices = document.querySelectorAll(promo.selector);
  	if(!callback){if(document.getElementsByClassName("affirm-as-low-as")[0])return;}

    for (let i in prices) {
      
      let price = prices[i].innerText;

      if(price){
        
        
        if(callback){
          
          var child = prices[i].querySelector(".affirm-as-low-as");
          if(child) prices[i].removeChild(child);
          
        }
   
		let ala = getAffirmALA(promo,price,styleArray);

        if(ala){
          
          prices[i].insertAdjacentElement(promo.position, ala);
   
        }  
         
      } 

    }
  	affirm.ui.ready(function () {
      affirm.ui.refresh();

      if(callback) callback();
    });
}
function getAffirmALA(promo, itemPrice, styleArray) {

	let totalAmount = itemPrice.replace(/[^\d]/g,"");

	var price = parseInt(totalAmount).toString();

	if(promo.addCents) price += '00'

	var numOnly = price.match(/^[0-9]+$/) != null;
	
	var promoEl = document.createElement("p");
  	
  	var style = "";

	if(numOnly){ 
		promoEl.className = "affirm-as-low-as";
        style = "font-size: "+promo.fontSize+"px;";
		promoEl.dataset.amount = price;
		promoEl.dataset.affirmType = promo.logoType;

		if(promo.logoType === "logo" || promo.logoType === "symbol") promoEl.dataset.affirmColor = promo.logoColor;

		promoEl.dataset.pageType = promo.pageType;
	}
  
    if(styleArray){
      for(i in styleArray)style += styleArray[i];
  	}
  	
  	promoEl.style = style;
  
	return promoEl;
}

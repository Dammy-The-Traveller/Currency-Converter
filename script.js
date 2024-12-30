var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  var currentDate = new Date();
  
  
  var day = currentDate.getDate();
  
  
  var monthIndex = currentDate.getMonth();
  
  
  var year = currentDate.getFullYear();
  
  
  var hours = currentDate.getHours();
  
  
  var minutes = currentDate.getMinutes();
  
  var monthName = monthNames[monthIndex];
  var formattedDate = monthName + " " + day + "," + year;
  
  
  var formattedTime = hours + ":" + (minutes < 10 ? '0' : '') + minutes;
  
  var dateTime = formattedDate + " " + formattedTime + " GMT";
  document.getElementById('time').innerText = dateTime;
  
     window.addEventListener('load', function () {
              fetchCurrencies()   
              // add event listeners to the inputs
              var currencyOptInput = Array.from(document.getElementsByClassName('currency-amt-inp'))
              currencyOptInput.forEach(element => {
                  element.addEventListener('keyup', async function (event) {
                       console.log(event.target.value); 
                       var input = event.target
                       var amount = input.value
                       var idTo = null;
                       var idFrom = input.getAttribute('id')
                       if (idFrom=='base-currency-amt') {
                          idTo = 'result-currency-amt'
                          var fromCurrency = document.getElementById('base-currency-opt').value
                          var toCurrency   = document.getElementById('result-currency-opt').value
                       } else {
                          idTo = 'base-currency-amt'
                          var toCurrency = document.getElementById('base-currency-opt').value
                          var fromCurrency   = document.getElementById('result-currency-opt').value
                         
                       }
  
                       var response = await convertRate(fromCurrency, toCurrency, amount);
                       if (response.success==true) {
                            var result = response.result
                         var resu =   document.getElementById(idTo).value = result.toFixed(2)
  
                         var ptext = amount + " " + document.getElementById(fromCurrency).innerText  + " equals";
                            var paragraph1 = document.getElementById('up');
                             paragraph1.innerText = ptext;
  
                             var ptext2 = resu + " " + document.getElementById(toCurrency).innerText ;
                            var paragraph2 = document.getElementById('downs');
                             paragraph2.innerText = ptext2;
  
                       } else {
                        console.error('Failed to fetch:', response.statusText);
                          alert('Sommething went wrong ...')
                       }
                      //  console.log(response.success)
                  })
              
              });
              
              
              // add event listeners to the select drop downs
              var currentOptSelect = Array.from(document.getElementsByClassName('currency-opt'))
              currentOptSelect.forEach(function (element) {
                  element.addEventListener('change', async function (event) {
                      var selectElement = event.target
                      var fromCurrency = event.target.value
                       
                       var idTo = null;
  
                       var idFrom = selectElement.getAttribute('id')
                       if (idFrom=='base-currency-opt') {
                          idTo = 'result-currency-amt'
                          var toCurrency   = document.getElementById('result-currency-opt').value
                          var amount = document.getElementById('base-currency-amt').value
                       } else {
                          idTo = 'base-currency-amt'
                          var toCurrency = document.getElementById('base-currency-opt').value
                          var amount = document.getElementById('result-currency-amt').valu
                       }
  
                       if (amount!='') {
                          var response = await convertRate(fromCurrency, toCurrency, amount);
                          if (response.success==true) {
                              var result = response.result
                               document.getElementById(idTo).value = result.toFixed(2)
  
         
                          } else {
                            console.error('Failed to fetch:', response.statusText);
                              
                          }
                       } else {
                          console.log('amount is NULL')
                       }
                       console.log(amount)
                  })
              })
           })
  
           
  
  
  
            async function fetchCurrencies() {
  
                  // fetching the resource by setting values in the fetch function
                  var response = await fetch('https://currency-converter-pro1.p.rapidapi.com/currencies', 
                                  {
                                      method: 'GET',
                                      headers: {
                                          'X-RapidAPI-Key': 'd549c24e8emsh4a1b338bfa64181p1385c6jsn79fdcc2f1a5b',
                                          'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com'
                                      }
                                  });
  
                  if (response.ok) {
                      var res = await response.json()
                      var currencies = res.result
  
                      // converting the currency object to an array
                      var arrCurrencies = Object.entries(currencies)
                      // console.log(arrCurrencies)
  
                      var optionsHTML='';
                      arrCurrencies.forEach(function (currency) {
                          optionsHTML += '<option id="'+currency[0]+'" value="'+currency[0]+'">'+currency[1]+'</option>';
                      })
  
                      //  console.log(optionsHTML)
  
                      document.getElementById('base-currency-opt').innerHTML = optionsHTML
                      document.getElementById('result-currency-opt').innerHTML = optionsHTML
                  } else {
                    console.error('Failed to fetch:', response.statusText);
                      
                  }
  
            }
  
   
            async function convertRate(fromCurrency, toCurrency, amt) {      
                      // fetching the resource by setting values in the fetch function
                      var response = await fetch('https://currency-converter-pro1.p.rapidapi.com/convert?from='+fromCurrency+'&to='+toCurrency+'&amount='+amt, 
                                      {
                                          method: 'GET',
                                          headers: {
                                              'X-RapidAPI-Key': 'd549c24e8emsh4a1b338bfa64181p1385c6jsn79fdcc2f1a5b',
                                              'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com'
                                          }
                                      });
  
                      if (response.ok) {
                          var res = await response.json()
                          return res;
                      } else {
                        console.error('Failed to fetch:', response.statusText);
                         return {'success':false}
                      }
  
          
              }
      
      

//BUDGET CONTROLLER MODULE
var budgetController = (function(){
   var Income = function(id,description,value){
      this.id = id;
      this.description = description;
      this.value = value;
   };
   var Expenses = function(id,description,value){
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
   };

   Expenses.prototype.calculatePercentage = function(totalIncome){
       if(totalIncome > 0){
        this.percentage = Math.round((this.value / totalIncome) * 100);
       } else {
        this.percentage = -1;
       }
   };
   Expenses.prototype.getPercentage = function(){
       return this.percentage;
   };
   var calculateTotal = function(type){
     //type will be the 'inc' for income and 'exp' for expenses
     var sum = 0;
     data.allItems[type].forEach(function(current){
        sum += current.value;
     });
     data.totals[type] = sum;
   };

   var data = {
      allItems:{
        exp:[],
        inc:[]
      },
      totals:{
        exp:0,
        inc:0
      },
      budget:0,
      percentage:-1
   };

   return {
      addItem:function(type,des,value){
        var newItem,ID;
        if(data.allItems[type].length !== 0){
          ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
          ID = 0;
        }
        
        if(type === "inc"){
          newItem = new Income(ID,des,value);
        } else if(type === "exp"){
          newItem = new Expenses(ID,des,value);
        }
        data.allItems[type].push(newItem);
        return newItem;
      },
      deleteItem:function(type,id){
        var ids;
        //[1,2,3,5,6]
        ids = data.allItems[type].map(function(current){
            return current.id;
        });
        index = ids.indexOf(id);
        if(index !== -1){
          data.allItems[type].splice(index,1);
        }
      },
      calculateBudget:function(){
        //calculate the total of income and expenses
          calculateTotal('inc');
          calculateTotal('exp');
        //calculate the budget i.e income - expenses
          data.budget = data.totals.inc - data.totals.exp;
          if(data.totals.inc > 0){
        //calculate the percentage i.e expenses/income * 100 
            data.percentage = Math.round((data.totals.exp / data.totals.inc )* 100);
          } else {
            data.percentage = -1;
          }

      },
      getBudget:function(){
          return {
            budget:data.budget,
            totalInc:data.totals.inc,
            totalExp:data.totals.exp,
            percentage:data.percentage,
          }
      },
      calculatePercentages:function(){
         //calculate the percentages
         data.allItems.exp.forEach(function(cur){
              cur.calculatePercentage(data.totals.inc);
         });

      },
      getPercentages:function(){
         var allPercentages = data.allItems.exp.map(function(current){
             return current.getPercentage();
         });
         console.log(allPercentages);
         return allPercentages;

      },
      testing:function(){
        console.log(data.allItems);
      }
   }
})();

//UI CONTROLLER MODULE
var UIController = (function(){
     var DOMstrings = {
        inputType:".add__type",
        inputDescription:".add__description",
        inputValue:".add__value",
        inputBtn:".add__btn",
        incomeContainer:".income__list",
        expensesContainer:".expenses__list", 
        budgetValue:".budget__value",
        totalIncValue:".budget__income--value",
        totalExpValue:".budget__expenses--value",
        expPercentage:".budget__expenses--percentage",
        container:".container",
        expItemPercentage:".item__percentage",
        dateLabel:".budget__title--month"
     };
     var formatNumber = function(num,type){
        //add + or - in the begining of number
        //two decimals after the number
        //separate by the comma at thousands
        var numSplit,int,dec,
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split(".");
        int = numSplit[0];
        if(int.length > 3){
          int = int.substr(0,int.length - 3) + "," + int.substr(int.length - 3,int.length); //200
        }
        dec = numSplit[1];
        return (type === "inc" ? "+" : "-" ) + " Rs " + int + "." + dec;

     };
     return {
        getInput:function() {
          return {
            type : document.querySelector(DOMstrings.inputType).value,
            description : document.querySelector(DOMstrings.inputDescription).value,
            value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
          }
        },
        addListItems:function(type,obj){
          var html,newHtml,element;
          //Create the HTML elements
          if(type === "inc"){
            element = document.querySelector(DOMstrings.incomeContainer);
            html = `<div class="item" id="inc-${obj.id}">
              <div class="item__description">${obj.description}</div>
              <div class="right">
              <div class="item__value">${formatNumber(obj.value,type)}</div>
              <div class="item__delete">
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
              </div></div></div>`;
          } else if(type === "exp"){
            element = document.querySelector(DOMstrings.expensesContainer);
            html = `<div class="item" id="exp-${obj.id}">
              <div class="item__description">${obj.description}</div>
              <div class="right">
                <div class="item__value">${formatNumber(obj.value,type)}</div>
                <div class="item__percentage">21%</div>
                <div class="item__delete">
                  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
              </div>
              </div>`;
          }
          //Replace the dynamic values with their specific position
          // newHtml = html.replace("%id%",obj.id);
          // newHtml = newHtml.replace("%description%",obj.description);
          // newHtml = newHtml.replace("%value%",obj.value);

          //Insert the html elements as child to their parentList Container
          element.insertAdjacentHTML("beforeend",html);
        },
        deleteListItem:function(selectorId){
          var el = document.querySelector(`#${selectorId}`);
          el.parentNode.removeChild(el);
        },
        clearFields:function(){
          var fields,fieldArr;
          
          fields = Array.from(document.querySelectorAll(DOMstrings.inputDescription + "," + DOMstrings.inputValue));
          // fieldArr = Array.prototype.slice.call(fields);
          fields.forEach(function(current,index,array){
              current.value = "";
          });
          fields[0].focus();
           
        },
        displayBudget:function(obj){
             var type = obj.budget >= 0 ? "inc" : "exp";
             document.querySelector(DOMstrings.budgetValue).textContent = `${formatNumber(obj.budget,type)}`;
             document.querySelector(DOMstrings.totalIncValue).textContent = `${formatNumber(obj.totalInc,"inc")}`;
             document.querySelector(DOMstrings.totalExpValue).textContent = `${formatNumber(obj.totalExp,"exp")}`;
             if(obj.percentage > 0){
                document.querySelector(DOMstrings.expPercentage).textContent = `${obj.percentage}%`;
             } else {
                document.querySelector(DOMstrings.expPercentage).textContent = `---`;                
             }
        },
        displayPercentages:function(percentages){
          var lists = Array.from(document.querySelectorAll(DOMstrings.expItemPercentage));
          lists.forEach(function(current,index){
              if(percentages[index] !== -1){
               current.textContent = `${percentages[index]}%`;
              } else {
               current.textContent = `---`;                
              }
          });
          
          // var lists = document.querySelectorAll(DOMstrings.expItemPercentage);
          // var nodelistForEach = function(lists,callback){
          //      for(var i= 0 ; i< lists.length;i++){
          //         callback(lists[i],i);
          //      }
          // };
          // nodelistForEach(lists,function(current,index){
          //      current.textContent = percentages[index] + "%";
          // });
        },
        displayDate:function(){
          var todaysDate,months,month,year;
          todaysDate = new Date();
          months = ["January","February","March","April","May","June","July","August","September","Ocotber",
          "November","December"];
          month = todaysDate.getMonth();
          year =  todaysDate.getFullYear();
          document.querySelector(DOMstrings.dateLabel).textContent = months[month] + " " + year;
        },
        changeFocus:function(){
         var targetElements = Array.from(document.querySelectorAll(
            DOMstrings.inputType + "," + 
            DOMstrings.inputDescription + "," + 
            DOMstrings.inputValue));
         targetElements.forEach(function(current){
             current.classList.toggle("expenses-focus");
         });
         document.querySelector(DOMstrings.inputBtn).classList.toggle("expenses__add--btn");
        },
        getDOMstrings:function(){
            return DOMstrings;
        }
        
     };
     
})();


//APP CONTROLLER MODULE
var appController = (function(budgetCtrl,UICtrl){
     var setupEventListeners = function(){
         var DOM = UICtrl.getDOMstrings();
         document.querySelector(DOM.inputBtn).addEventListener("click",ctrlAddItem);
         document.addEventListener("keypress",function(event){
            if(event.keyCode === 13){
              ctrlAddItem();
            }
         });
         document.querySelector(DOM.container).addEventListener("click",deleteItem);
         document.querySelector(DOM.inputType).addEventListener("change",UICtrl.changeFocus);
     };
     var updateBudget = function(){
        //Calculate the net budget
          budgetCtrl.calculateBudget();
          var budget = budgetCtrl.getBudget();
        //Add the budget to the UI
          UICtrl.displayBudget(budget);
     };
     var updatePercentages = function(){

          //calculate percentage
           budgetCtrl.calculatePercentages();
          //read the percentage from data structure
           var percentages = budgetCtrl.getPercentages();
          //update the UI with each percentage
          UICtrl.displayPercentages(percentages);
     };
     
     var ctrlAddItem = function(){
         var inputData,newItem;
        //Get the input data field from the user
         inputData = UICtrl.getInput();
         if(inputData.description !== "" && !isNaN(inputData.value) && inputData.value > 0){
             //Add the item to the budget controller
             newItem = budgetCtrl.addItem(inputData.type,inputData.description,inputData.value); 
            //Add the item to UI
             UICtrl.addListItems(inputData.type,newItem);

            //Clear the fields
             UICtrl.clearFields();

             //Update the budgets
             updateBudget();

             //calculate and update percentages for each item
             updatePercentages();
         }        
     };

     //Delete the items
     var deleteItem =  function(event){
        var itemID,ID,type;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
          type = itemID.split("-")[0];
          ID = parseInt(itemID.split("-")[1]);

          //delete the item from the data structure
          budgetCtrl.deleteItem(type,ID);
          //delete the item from UI controller
          UICtrl.deleteListItem(itemID);
          //Update the budget in the budget controller and display in the UI
          updateBudget();

           //calculate and update percentages for each item
           updatePercentages();
        }
     };

     return {
      init:function(){
        UICtrl.displayDate();
        console.log("Application has started");
        setupEventListeners();
        UICtrl.displayBudget({
            budget:0,
            totalInc:0,
            totalExp:0,
            percentage:-1,
          });
      }
     };


})(budgetController,UIController);

appController.init();



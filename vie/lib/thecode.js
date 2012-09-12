function launch(){

	//getting all entities for further needs
	var entities=new Array();	
	$(function () {
		// Instantiate VIE
		var vie = new VIE();
		// Pass the service instance and a name you want to use for it
		vie.use(new vie.RdfaService, 'rdfa');

		  vie.analyze({
			element: $('[typeof]')
			
    			}).using("rdfa").done(function(ent) {
			
			var i=0;
			
        		_.each(ent, function(e) {
 			   var name = e.get("dbprop:name");
						
			   name = _.isArray(name) ? name[0]:name;    	
			   entities[i]=name;			
			   i++; 
			  });
		   }).execute();	
			
			
         });

	//entities adding to the array without repeatition
	j=0;
	while(j<entities.length)
	{ 
	var tmp=entities[j];
	var ct=j;
	while(ct<entities.length)
	{
	if(tmp==entities[ct+1])
	entities.splice(ct+1,1);
	ct++;
	}
	ct=0;	
	j++;
	}

 	//need to get partial word of the item

	j=0;
	var l=0, k=0 ;
	var pair_ent=new Array();
	var single_ent=new Array();
	while (j<entities.length)
	{
	 
	 var tmp=entities[j];
	 tmp=tmp.split(" ");
	 if (tmp.length==2)
	 {
	    pair_ent[l]=tmp[0];
	    pair_ent[l+1]=tmp[1];
	    l+=2;         		   
         }
         else { 
		single_ent[k]=tmp[0];
	        k++;
	      } 
	 j++;
	}
	
	
	console.log(pair_ent);
	console.log(single_ent);	  
	  
	//getting the user input
	var str=document.getElementById('speech').value;
	
	//function for capitalizing words
	String.prototype.capitalize = function() {
    	return this.charAt(0).toUpperCase() + this.slice(1);
	}

	//function to check for odd or even
	var isEven = function(someNumber){
            return (someNumber%2 == 0) ? true : false;
        };


       	//splitting the string into a set of words	
	str=str.split(" ");
	
	i=0;
	var string=new Array();
	while(i<str.length)
	{
	 var tmp=str[i].capitalize();
	     string[i]=tmp;
	     
	 i++;	  
	}
	
	//separating process and target like "Show me" (process) and "John Lennon" (target)	
	
	var check=false;	
	if (string.length==4)
	{
	  if (string[0]=="Show" && string[1]=="Me"){
	     var process=string[0]+" "+string[1];
	     var target=string[2]+" "+string[3];
	  }
	}
	else if (string.length==3)
	{
	  if (string[0]=="Show" && string[1]=="Me"){
	     var process=string[0]+" "+string[1];
	     
             //we have to check for partial match of entities
             var id=pair_ent.indexOf(string[2]);
		if (id>=0){
		   if (isEven(id) || id==0){
		      var target=pair_ent[id]+" "+pair_ent[id+1];
		      check=true;
		   }	
		   else {
			var target=pair_ent[id-1]+" "+pair_ent[id];	
			check=true;
		   }
		}
	     var id=single_ent.indexOf(string[2]);
		if (id>=0){
	           var target=single_ent[id];
		   check=true;
		}   	
	  }
	  else if (string[0]=="Show" && string[1]!="Me"){
	     var process=string[0];
	     var target=string[1]+" "+string[2];	
	  }	 
	}
	else if (string.length==2)
        {
	  if (string[0]=="Show" && string[1]!="Me"){
	     var process=string[0];
	     
  	     //we have to check for partial match
	     var id=pair_ent.indexOf(string[1]);
		if (id>=0){
		   if (isEven(id) || id==0){
		      var target=pair_ent[id]+" "+pair_ent[id+1];	
		      check=true;
		   }
		   else {
			var target=pair_ent[id-1]+" "+pair_ent[id];	
			check=true;
		   }
		}
	     var id=single_ent.indexOf(string[2]);
		if (id>=0){
	           var target=single_ent[id];
		   check=true;
		}   

  	 
	   }
	  else if (string[0]=="Show" && string[1]=="Me"){
	     var process=string[0]+" "+string[1];	
	     var text=prompt("Please, define the item to be highlighted!","John Lennon");
		if (text!="")
	           {
	             text=text.split(" ");
	             i=0;
			var pr_string=new Array();
			while(i<text.length)
			{
			 var tmp=text[i].capitalize();
	 		    pr_string[i]=tmp;
	     
	 		i++;	  
			}
                        if (pr_string.length==2)
			{	
			   var target=pr_string[0]+" "+pr_string[1];      			   
			}
			if (pr_string.length==1)
			{
			   
			   //we have to check for partial match
			   var id=pair_ent.indexOf(pr_string[0]);
		              if (id>=0){
		                 if (isEven(id) || id==0){
		                    var target=pair_ent[id]+" "+pair_ent[id+1];	
				    check=true;
				 }
		                 else {
				       var target=pair_ent[id-1]+" "+pair_ent[id];	
				       check=true;
				      }	
		               }
	                   var id=single_ent.indexOf(pr_string[0]);
		              if (id>=0){
	                         var target=single_ent[id];
				 check=true;
		              }   
			   
			}
			if (pr_string.length>2)
			{
			   var target="nothing";	
			}
		        			
		   }
		else { 
			alert("Please, give the item you want to be highlighted!");  	
		        var process="Not given";
			var target="nothing";
	     	     }
	  }
	  else {
   		var process="Not given";	     
		var target=string[0]+" "+string[1];  		
	  } 
	}
	else if (string.length==1)
	{
	    if (string[0]=="Show"){
               var process=string[0];
	       var text=prompt("Please, define the item to be highlighted!","George Harrison");
		   if (text!="")
	           {
	             text=text.split(" ");
	             i=0;
			var pr_string=new Array();
			while(i<text.length)
			{
			 var tmp=text[i].capitalize();
	 		    pr_string[i]=tmp;
	     
	 		i++;	  
			}
                        if (pr_string.length==2)
			{	
			   var target=pr_string[0]+" "+pr_string[1];      			   
			}
			if (pr_string.length==1)
			{
			   
			   //we have to check for partial match
			   var id=pair_ent.indexOf(pr_string[0]);
		              if (id>=0){
		                 if (isEven(id) || id==0){
		                    var target=pair_ent[id]+" "+pair_ent[id+1];	
				    check=true;
				 }
		                 else {
				       var target=pair_ent[id-1]+" "+pair_ent[id];	
				       check=true;
				      }	
		               }
	                   var id=single_ent.indexOf(pr_string[0]);
		              if (id>=0){
	                         var target=single_ent[id];
				 check=true;
		              }   
			   
			}
			if (pr_string.length>2)
			{
			   var target="nothing";	
			}
		        			
		   }
		else { 
			alert("Please, give the item you want to be highlighted!");  	
		        var process="Not given";
			var target="nothing";
	     	     }


	    }
	    else {
		  
		  var id=pair_ent.indexOf(string[0]);
		     if (id>=0){
		        if (isEven(id) || id==0){
		           var target=pair_ent[id]+" "+pair_ent[id+1];
			   check=true;
			}	
		        else {
			      var target=pair_ent[id-1]+" "+pair_ent[id];	
			      check=true;
			}
		     }
	          var id=single_ent.indexOf(string[0]);
		     if (id>=0){
	                var target=single_ent[id];
			check=true;
		     }   
		  
		  var process="Not given";
	        }	
	}
	else if (string[0]=="Show")
	{
	   if (string[1]=="Me"){
	      var process=string[0]+" "+string[1];
	      var text=prompt("Please, define the item to be highlighted!","Paul McCartney");
		if (text!="")
	           {
	             text=text.split(" ");
	             i=0;
			var pr_string=new Array();
			while(i<text.length)
			{
			 var tmp=text[i].capitalize();
	 		    pr_string[i]=tmp;
	     
	 		i++;	  
			}
                        if (pr_string.length==2)
			{	
			   var target=pr_string[0]+" "+pr_string[1];      			   
			}
			if (pr_string.length==1)
			{
			   
			   //we have to check for partial match
			   var id=pair_ent.indexOf(pr_string[0]);
		              if (id>=0){
		                 if (isEven(id) || id==0){
		                    var target=pair_ent[id]+" "+pair_ent[id+1];	
				    check=true;
				 }
		                 else {
				       var target=pair_ent[id-1]+" "+pair_ent[id];	
				       check=true;
				      }	
		               }
	                   var id=single_ent.indexOf(pr_string[0]);
		              if (id>=0){
	                         var target=single_ent[id];
				 check=true;
		              }   
			   
			}
			if (pr_string.length>2)
			{
			   var target="nothing";	
			}
		        			
		   }
		else { 
			alert("Please, give the item you want to be highlighted!");  	
		        var process="Not given";
			var target="nothing";
	     	     }


	      }
           else {
	         var process=string[0];
		 var target=prompt("Please, define the item to be highlighted!","Stuart Sutcliffe");
		     if (text!="")
	           {
	             text=text.split(" ");
	             i=0;
			var pr_string=new Array();
			while(i<text.length)
			{
			 var tmp=text[i].capitalize();
	 		    pr_string[i]=tmp;
	     
	 		i++;	  
			}
                        if (pr_string.length==2)
			{	
			   var target=pr_string[0]+" "+pr_string[1];      			   
			}
			if (pr_string.length==1)
			{
			   
			   //we have to check for partial match
			   var id=pair_ent.indexOf(pr_string[0]);
		              if (id>=0){
		                 if (isEven(id) || id==0){
		                    var target=pair_ent[id]+" "+pair_ent[id+1];	
				    check=true;
				 }
		                 else {
				       var target=pair_ent[id-1]+" "+pair_ent[id];	
				       check=true;
				      }	
		               }
	                   var id=single_ent.indexOf(pr_string[0]);
		              if (id>=0){
	                         var target=single_ent[id];
				 check=true;
		              }   
			   
			}
			if (pr_string.length>2)
			{
			   var target="nothing";	
			}
		        			
		   }
		else { 
			alert("Please, give the item you want to be highlighted!");  	
		        var process="Not given";
			var target="nothing";
	     	     }
	        }	 
			
	}
	else 
	{
 	   var process="Not given";
	   var target=prompt("Can you please clarify what you have said?","Stuart Sutcliffe");
	}



	
	  //checking input with alert
	  //alert(process);
	  //alert(target);
     //while target is "nothing" or check=false we will not go into highlighting process 
     if (target!="nothing" || check==true){
  	
	$(function () {
		// Instantiate VIE
		var vie = new VIE();
		// Pass the service instance and a name you want to use for it
		vie.use(new vie.RdfaService, 'rdfa');

		// Call a method from the service using the name
		// this one would give us the RDF subject of the
		// element matched by the jQuery selector
		//vie.service('rdfa').getElementSubject('div.article');
		
		
		  vie.analyze({
			element: $('[typeof]')
			
    			}).using("rdfa").done(function(ent) {
			
			var counter=0;
        		_.each(ent, function(e) {
			var name = e.get("dbprop:name");
						
			name = _.isArray(name) ? name[0]:name;    	
			
                        if (name==target)
			{
			  counter++;
			  
			  var views = e.vie.services["rdfa"].views;
			   
			          		  
			  _.each(views, function (v) {
			             	    
                    	       $(v.el).css("background", "rgba(0, 0, 0, 0)");
			                                
                 	    });
			  
	
		          /* BEGIN: highlight VIEWs */
			  
            		  _.each(views, function (v) {
			    				     				
                	    if (v.model.isEntity && v.model.getSubjectUri() === e.getSubjectUri()) {
                    	       $(v.el).css("background", "rgba(0, 200, 0, 0.4)");
			       //alert("Successfull");	
                	    }
            		  });
                        }
			
                        
			                
                    });
           	
		
			if (!counter){
			   alert("Sorry, I could not find "+target+".\n Please, try again!");
			   //document.location.reload(true);  
			}
                       
       }).execute();
		
	
	    
   });
  }
  else alert("Sorry, I could not find the entity you wanted.\n Please, try again!")
}

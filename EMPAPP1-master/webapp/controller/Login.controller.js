sap.ui.define([
         "EA/EmployeeApp2/controller/BaseController",
          "sap/m/MessageToast",
          "sap/ui/model/json/JSONModel",
          "sap/ui/core/Fragment"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController,MessageToast,JSONModel,Fragment) {
		"use strict";

		return BaseController.extend("EA.EmployeeApp2.controller.Login", {
            
            
			onInit: function () {
                this.getView().setModel(new JSONModel(), "Login");
                  this.getView().setModel(new JSONModel(), "ch");
                 this.oRouter =  sap.ui.core.UIComponent.getRouterFor(this);
                 // this.getProfile();
                 this.getLogin();
                 this.getRequest();
                    //this.getOthers();
                    this.getFileData();
                      this.getProject();
                        this.getHome();
            },
 
        
            onLogin:function(){
              // debugger;
                var id = this.getView().getModel("Login").getProperty("/id");
                var password = this.getView().getModel("Login").getProperty("/password");

                // var IDM = /^[A-Z]{2}[0-9]{3}$/;
                // var re = /(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{6,}/;
                 var IDE;
                // var PWE;

                var oLModel = this.getOwnerComponent().getModel("loginModel").getProperty("/login");
 
                if(id==undefined && password== undefined){
                    this.getView().byId("userId").setValueState("Error");
                     this.getView().byId("userId").setValueStateText("Please Enter Your Id");
                    this.getView().byId("userPassword").setValueState("Error");
                     this.getView().byId("userPassword").setValueStateText("Please Enter Your Password");
                }
                
                
               
               
                 else if(id==undefined ){
                       this.getView().byId("userId").setValueState("Error");
                       this.getView().byId("userId").setValueStateText("Please Enter Your Id");
                } else if(password== undefined){
                     this.getView().byId("userId").setValueState("None");
                     this.getView().byId("userPassword").setValueState("Error");
                     this.getView().byId("userPassword").setValueStateText("Please Enter Your Password");
                }

                else{

                    for (let i = 0; i < oLModel.length; i++) {
                        if(oLModel[i].Eid=== id && oLModel[i].Password===password){
                            this.getView().byId("userId").setValueState("None");
                                this.getView().byId("userPassword").setValueState("None");
                                sap.m.MessageToast.show("Your are successfully logged in")
                                 this.oRouter.navTo("SplitApp",{ID:id});
                                 break;
                        }
                        else{
                             sap.m.MessageToast.show("Your are not a valid user")
                        this.getView().byId("userId").setValueState("Error");
                        this.getView().byId("userPassword").setValueState("Error");
                        }
                        
                    }

                        
                        this.Eid = id;

            }
                
         },
           
              changePassword:function() {
		          //	debugger;
			var oView = this.getView();

			if (!this.byId("CHPassWordDialog")) {
				Fragment.load({
                    id: oView.getId(),
                    
					name: "EA.EmployeeApp2.view.changePassword",
					controller: this

				}).then(function (oDialog) {
					oView.addDependent(oDialog);
                    oDialog.open();
                    
				});
			} else {
				this.byId("CHPassWordDialog").open();
			}

        },

            onClose:function(){
                // this.changePass.close();
                this.getView().byId("CHPassWordDialog").close();
            },
            newPassword:function(){
                debugger
             var id = this.getView().getModel("ch").getProperty("/id");
			var newPass = this.getView().getModel("ch").getProperty("/newPass");
            var confPass = this.getView().getModel("ch").getProperty("/confPass");
           

             var re = /(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{6,}/;
            
               
            

           if(id ==undefined && newPass ==undefined && confPass == undefined){
                  
                   this.getView().byId("Cid").setValueState("Error");
                    this.getView().byId("Cid").setValueStateText("Please Enter Your Id");
                    this.getView().byId("Cpass").setValueState("Error");
                     this.getView().byId("Cpass").setValueStateText("Please Enter Your Password");
                      this.getView().byId("Cnpass").setValueState("Error");
                     this.getView().byId("Cnpass").setValueStateText("Please Enter Your Confirm Password");
           } 
           else if(id ==undefined){
                      this.getView().byId("Cid").setValueState("Error");
                    this.getView().byId("Cid").setValueStateText("Please Enter Your Id");
           }
           else if(newPass !== confPass){
                   this.getView().byId("Cpass").setValueState("Error");
                     this.getView().byId("Cpass").setValueStateText("Password is not Matched");
                     this.getView().byId("Cnpass").setValueState("Error");
                     this.getView().byId("Cnpass").setValueStateText("Confirm Password is not Mathed With new password");
                     

           }
           else if(newPass ==undefined){
                this.getView().byId("Cid").setValueState("None");
                     this.getView().byId("Cpass").setValueState("Error");
                     this.getView().byId("Cpass").setValueStateText("Please Enter Your Password");
           }else if(confPass == undefined){
                this.getView().byId("Cid").setValueState("None");
                this.getView().byId("Cnpass").setValueState("Error");
                     this.getView().byId("Cnpass").setValueStateText("Please Enter Your Confirm Password");
           }else if (!re.test(newPass )) {

				this.getView().byId("Cpass").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("Cpass").setValueStateText(
					"Password Must Contain atleast 6 characters , Uppercase letters, Special Characters,digits");

			} 
           else{
               
               if(newPass === confPass){
                this.getView().byId("Cid").setValueState("None");
             
              this.getView().byId("Cpass").setValueState("None");
              
                this.getView().byId("Cnpass").setValueState("None");
                this.updateLogin(id,newPass)
                MessageToast.show("Password Changed SuccesFully! ");

            }
            else{
                MessageToast.show("password and confirm password should be  same");
               }
         }
    }

		});
	});

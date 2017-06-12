(function(){
/// <reference path="./node_modules/@types/jquery/index.d.ts"/> 
    //Global Variable and Classes
    class Employee{
        name:string;
        id:number;
        designation:string;
        type:string;
        constructor(n:string,dsg:string,typ:string){
            this.name=n;
            this.designation=dsg;
            this.type=typ;
            this.id=EMP_ID++;
        }
    }
    class EmployeeType{
        typeName:string;
        empList:Employee[];
        constructor(typeName:string,empList?:Employee[])
        {
            this.typeName=typeName;
            if(empList==null){
            this.empList=new Array<Employee>();
            }else{
                this.empList=empList;
            }
        }
       
        addEmployeeInType(emp:Employee){
            this.empList.push(emp);
        }
        removeEmployeeFromType(emp:Employee){
            this.empList.splice(this.empList.indexOf(emp),1);
        }
    }
    class EmployeeList{
        empTypeList:EmployeeType[];
        constructor(){
            this.empTypeList=new Array<EmployeeType>();

        }
        addTypeInList(et:EmployeeType){
            this.empTypeList.push(et);
        }
        removeTypeFromList(et:EmployeeType){
            this.empTypeList.splice(this.empTypeList.indexOf(et),1);
        }
    }
    class UndoStack{
        undoList:Employee[];
        top:number;
        size:number;
        constructor(maxSize:number){
            this.undoList=new Array<Employee>(maxSize);
            this.top=-1;
            this.size=maxSize;
        }
        addEmpInUndoList(emp:Employee)
        {
            if(this.top==this.size-1){
                let tempList:Employee[] =new Array<Employee>(3);
                for(let indx:number=1;indx<this.size;indx++){
                    tempList[indx-1]=this.undoList[indx];
                }
                tempList[this.size-1]=emp;
                this.undoList=tempList;
            }
            else{
                this.undoList[++this.top]=emp;
            }
        }
        removeEmpFromUndoList():Employee
        {
            if(this.top==-1){
                return null;
            }
            else{
                return this.undoList[this.top--];
            }  
        }

    }




    // var EMP_LIST_OBJ_DATA={manager:[{firstName:"k",lastName:"p",designation:"CEO",type:"manager"},
    //                             {firstName:"v",lastName:"p",designation:"CTO",type:"manager"},
    //                             {firstName:"p",lastName:"c",designation:"CDO",type:"manager"}],
    //                     developer:[{firstName:"d",lastName:"k",designation:"sd",type:"developer"},
    //                             {firstName:"s",lastName:"j",designation:"jd",type:"developer"},
    //                             {firstName:"a",lastName:"g",designation:"sd",type:"developer"}],
    //                     tester:[{firstName:"m",lastName:"g",designation:"st",type:"tester"}]
    // };
    let EMP_LIST_OBJ:EmployeeList=new EmployeeList();
    let UNDO_LIST=new UndoStack(3);
    let EMP_ID:number=1;
    let EMP_TO_EDIT:Employee;
    
    var a=10;
    var b=[1,2,3,4,5];

    function abc(){
        return "hello world";
    }
    function ab1c(){
        return "hello world";
    }
    //var declaration
    var $empTypeModal,$btnSaveModalEmployeeType,$btnCloseModalEmployeeType,$ulRemoveEmployeeType; //Add or remove Employee type
    var $empModal,$btnCloseModalEmployee,$btnSaveModalEmployee,$ulEmployeeType,$txtNewEmployeeName,$txtNewEmployeeDesignation; //Add or Edit employee 
    var $divButtonSetBottom,$ulEmployeeList,$btnAddEmpForm,$btnEditEmpForm,$btnUndoEmpForm,$btnRemoveEmpForm; //bottom button set 
    var $btnCreateEmpType,$btnRemoveEmpType; //button to create new EMployee type

    //var definition

    //To handle new Emp Type
    $btnCreateEmpType=$('#btnCreateEmployeeType');
    $btnRemoveEmpType=$('#btnRemoveEmployeeType');

    $empTypeModal=$('#modalEmployeeType');
    $btnSaveModalEmployeeType=$('#btnSaveModalEmployeeType');
    $btnCloseModalEmployeeType=$('#btnCloseModalEmployeeType');
    $ulRemoveEmployeeType=$('#ulRemoveEmployeeType');
   

    //To handle new Emp 
    $empModal=$('#modalEmployee');
    $btnCloseModalEmployee=$('#btnCloseModalEmployee');
    $btnSaveModalEmployee=$('#btnSaveModalEmployee');
    $ulEmployeeType=$('#ulEmployeeType');
    $txtNewEmployeeName=$('#txtNewEmployeeName');
    $txtNewEmployeeDesignation=$('#txtNewEmployeeDesignation');

    $divButtonSetBottom=$('#divButtonSetBottom');
    $ulEmployeeList=$('#ulEmployeeList');
    $btnUndoEmpForm=$('#btnUndoEmpForm');
    $btnRemoveEmpForm=$('#btnRemoveEmpForm');
    
   

    //function definitions

    //functions to handle local storage
    function getDataFromLocalStorage(){
        if(window.localStorage.getItem('EMP_TYPE_LIST')!=undefined){
            var empTypeListStored=JSON.parse(window.localStorage.getItem('EMP_TYPE_LIST'));
            EMP_ID=JSON.parse(window.localStorage.getItem('EMP_ID'));
            for(let i:number=0;i<empTypeListStored.length;i++){
                EMP_LIST_OBJ.empTypeList[i]=new EmployeeType(empTypeListStored[i].typeName,empTypeListStored[i].empList);
            }
        }

    }
    function persist(){
        window.localStorage.setItem('EMP_TYPE_LIST',JSON.stringify(EMP_LIST_OBJ.empTypeList));
        window.localStorage.setItem('EMP_ID',JSON.stringify(EMP_ID));
        employeeListSetup();
    }

    //function to handle employee type
    function addNewEmployeeType(){
        
        $empTypeModal.find('#modalEmployeeTypeTitle').text('Add New Employee Type');
        $('#modalEmployeeType [data-action=remove]').addClass('hidden');
        $('#modalEmployeeType [data-action=add]').removeClass('hidden');
        $empTypeModal.attr('action','add');
        $empTypeModal.modal('show');

    }
     function removeEmployeeType(){
        $empTypeModal.find('#modalEmployeeTypeTitle').text('Remove Existing Employee Type');
        $ulRemoveEmployeeType.empty();
        for (let index:number = 0; index < EMP_LIST_OBJ.empTypeList.length; index++) {
            $ulRemoveEmployeeType.append($('<li>').text(EMP_LIST_OBJ.empTypeList[index].typeName)).on('click',changeEmployeeTypeDDText);
        }
        $('#modalEmployeeType [data-action=add]').addClass('hidden');
        $('#modalEmployeeType [data-action=remove]').removeClass('hidden');
        $empTypeModal.attr('action','remove');
        $empTypeModal.modal('show');

    }
    function modalEmployeeTypeSaveChangeHandler(){
        if($empTypeModal.attr('action')=='add'){
            let newType:string=$('#txtNewEmployeetype').val();
            EMP_LIST_OBJ.addTypeInList(new EmployeeType(newType));
            $btnCloseModalEmployeeType.click();

        }
        else{
           let typeToRemove:string=$('#dLabel').text();
           let indexOfTypeToRemove:number=EMP_LIST_OBJ.empTypeList.findIndex(function(obj,indx,a){
               return a[indx].typeName===typeToRemove;
           });
           if(indexOfTypeToRemove!=-1){
               EMP_LIST_OBJ.empTypeList.splice(indexOfTypeToRemove,1);
           }
        }
        $empTypeModal.find('input,button').val('');
        $empTypeModal.modal('hide');

        persist();
        
    }
    function changeEmployeeTypeDDText(){
        $('#dLabel').text(event.srcElement.textContent);
    }
    function changeEmployeeTypeDD2Text(){
        $('#dLabelModalEmployee').text(event.srcElement.textContent);
    }

    //To handle edit and addition of new emp
    function employeeChangeHandler(){
        if($(this).attr('action')=='add'){

            $ulEmployeeType.empty();
            for (let index:number = 0; index < EMP_LIST_OBJ.empTypeList.length; index++) {
                $ulEmployeeType.append($('<li>').text(EMP_LIST_OBJ.empTypeList[index].typeName)).on('click',changeEmployeeTypeDD2Text);
            }
            $empModal.attr('action','add');
            $empModal.modal('show');
            
        }
        else if($(this).attr('action')=='edit'){
            if(EMP_TO_EDIT!=null){
                $ulEmployeeType.empty();
                for (let index:number = 0; index < EMP_LIST_OBJ.empTypeList.length; index++) {
                    $ulEmployeeType.append($('<li>').text(EMP_LIST_OBJ.empTypeList[index].typeName)).on('click',changeEmployeeTypeDD2Text);
                }
                $empModal.attr('action','edit');
                $txtNewEmployeeName.val(EMP_TO_EDIT.name);
                $txtNewEmployeeDesignation.val(EMP_TO_EDIT.designation);
                $('#dLabelModalEmployee').text(EMP_TO_EDIT.type);
                

                $empModal.modal('show');
            }
            else{
                window.alert('Choose an employee first');
            }
        
        }
        event.preventDefault();
    }
    function modalEmployeeSaveChangeHandler(){
        if($empModal.attr('action')=='add'){
           let typeToAdd:string=$('#dLabelModalEmployee').text();
           let indexOfTypeToAdd:number=EMP_LIST_OBJ.empTypeList.findIndex(function(obj,indx,a){
               return a[indx].typeName===typeToAdd;
           });
           if(indexOfTypeToAdd!=-1){
               let empToAdd:Employee=new Employee($txtNewEmployeeName.val(),$txtNewEmployeeDesignation.val(),typeToAdd);
               EMP_LIST_OBJ.empTypeList[indexOfTypeToAdd].addEmployeeInType(empToAdd);
               UNDO_LIST.addEmpInUndoList(empToAdd);
           }

        }
        else{
            if(EMP_TO_EDIT!=undefined)
            {
                let id:number=EMP_TO_EDIT.id;
                EMP_TO_EDIT.name=$txtNewEmployeeName.val();
                EMP_TO_EDIT.designation=$txtNewEmployeeDesignation.val();
                if(EMP_TO_EDIT.type!=$('#dLabelModalEmployee').text())
                {
                    let oldType:string=EMP_TO_EDIT.type;
                    let indexOfOldType:number=EMP_LIST_OBJ.empTypeList.findIndex(function(obj,indx,a){
                        return a[indx].typeName===oldType;
                    });
                    EMP_LIST_OBJ.empTypeList[indexOfOldType].removeEmployeeFromType(EMP_TO_EDIT);

                    EMP_TO_EDIT.type=$('#dLabelModalEmployee').text();
                    let indexOfNewType:number=EMP_LIST_OBJ.empTypeList.findIndex(function(obj,indx,a){
                        return a[indx].typeName===EMP_TO_EDIT.type;
                    });
                    EMP_LIST_OBJ.empTypeList[indexOfNewType].addEmployeeInType(EMP_TO_EDIT);


                }
                

            }
        }
        $empModal.find('input,button').val('');
        $empModal.modal('hide');
        persist();
    }
    function empToEdit(){
        let id:number =parseInt($(this).attr('empId'));
        if(id!=null){
            EMP_LIST_OBJ.empTypeList.map(function(et,indx,etlist){
                et.empList.map(function(emp,index,emplist){
                    if(emp.id===id){
                        EMP_TO_EDIT=emp;
                    }
                });
            });
        }


    }
    function undoAddedEmployee(){
        let empToRemove:Employee=UNDO_LIST.removeEmpFromUndoList();
        if(empToRemove==null){
            window.alert('Undo Stack is empty try adding some employee and then perform operation');
            return;
        }
        let empTypeToRemoveList:EmployeeType;
        EMP_LIST_OBJ.empTypeList.map(function(et,indx,etlist){
            if(et.typeName==empToRemove.type){
                empTypeToRemoveList=et;
            }
        });
        empTypeToRemoveList.removeEmployeeFromType(empToRemove);
        persist();
    }
    function removeAddedEmployee(){
         if(EMP_TO_EDIT!=undefined){
                
            let oldType:string=EMP_TO_EDIT.type;
            let indexOfOldType:number=EMP_LIST_OBJ.empTypeList.findIndex(function(obj,indx,a){
                return a[indx].typeName===oldType;
            });
            EMP_LIST_OBJ.empTypeList[indexOfOldType].removeEmployeeFromType(EMP_TO_EDIT);
            persist();
        }
    }
    
    //Handling Employee list and type visible in right Div
    function employeeListSetup(){
        $('#divEmployeeType').html("");
        EMP_LIST_OBJ.empTypeList.map(function(et,indx,etlist){
            $('#divEmployeeType').append($('<button>').text(et.typeName).attr({"class":'btn-top',"data-index":indx,"value":et.typeName}).on('click',changeEmployeeList));
        });
        var $firstType=$('#divEmployeeType button').eq(0);
        if($firstType!=undefined){
            $firstType.click();
        }

    }
    function changeEmployeeList(){
        
        EMP_TO_EDIT=undefined;
        let indx:number;
       
        indx=parseInt($(this).attr("data-index"));
        
        $ulEmployeeList.empty();
        if(EMP_LIST_OBJ.empTypeList[indx]!=undefined){
            EMP_LIST_OBJ.empTypeList[indx].empList.map(function(emp,idx,emplist){
                $ulEmployeeList.append($('<li>').text(emplist[idx].name).attr('empId',emp.id).on('click',empToEdit));
            });
        }
        
        

    }
 
    //To initialize page
    function init(){

        getDataFromLocalStorage();
        $btnCreateEmpType.on('click',addNewEmployeeType);
        $btnRemoveEmpType.on('click',removeEmployeeType);
        $btnSaveModalEmployeeType.on('click',modalEmployeeTypeSaveChangeHandler);
        $('#ulRemoveEmployeeType li').on('click',changeEmployeeTypeDDText);
        


        $('#divButtonSetBottom button[action]').on('click',employeeChangeHandler);
        $btnSaveModalEmployee.on('click',modalEmployeeSaveChangeHandler);
        $('#ulEmployeeType li').on('click',changeEmployeeTypeDD2Text);
        $('#ulEmployeeList li').on('click',empToEdit);
        $btnUndoEmpForm.on('click',undoAddedEmployee);
        $btnRemoveEmpForm.on('click',removeAddedEmployee);

        employeeListSetup();

    }
    //init
    init();
        
})();

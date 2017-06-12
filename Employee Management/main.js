(function () {
    /// <reference path="./node_modules/@types/jquery/index.d.ts"/> 
    //Global Variable and Classes
    var Employee = (function () {
        function Employee(n, dsg, typ) {
            this.name = n;
            this.designation = dsg;
            this.type = typ;
            this.id = EMP_ID++;
        }
        return Employee;
    }());
    var EmployeeType = (function () {
        function EmployeeType(typeName, empList) {
            this.typeName = typeName;
            if (empList == null) {
                this.empList = new Array();
            }
            else {
                this.empList = empList;
            }
        }
        EmployeeType.prototype.addEmployeeInType = function (emp) {
            this.empList.push(emp);
        };
        EmployeeType.prototype.removeEmployeeFromType = function (emp) {
            this.empList.splice(this.empList.indexOf(emp), 1);
        };
        return EmployeeType;
    }());
    var EmployeeList = (function () {
        function EmployeeList() {
            this.empTypeList = new Array();
        }
        EmployeeList.prototype.addTypeInList = function (et) {
            this.empTypeList.push(et);
        };
        EmployeeList.prototype.removeTypeFromList = function (et) {
            this.empTypeList.splice(this.empTypeList.indexOf(et), 1);
        };
        return EmployeeList;
    }());
    var UndoStack = (function () {
        function UndoStack(maxSize) {
            this.undoList = new Array(maxSize);
            this.top = -1;
            this.size = maxSize;
        }
        UndoStack.prototype.addEmpInUndoList = function (emp) {
            if (this.top == this.size - 1) {
                var tempList = new Array(3);
                for (var indx = 1; indx < this.size; indx++) {
                    tempList[indx - 1] = this.undoList[indx];
                }
                tempList[this.size - 1] = emp;
                this.undoList = tempList;
            }
            else {
                this.undoList[++this.top] = emp;
            }
        };
        UndoStack.prototype.removeEmpFromUndoList = function () {
            if (this.top == -1) {
                return null;
            }
            else {
                return this.undoList[this.top--];
            }
        };
        return UndoStack;
    }());
    // var EMP_LIST_OBJ_DATA={manager:[{firstName:"k",lastName:"p",designation:"CEO",type:"manager"},
    //                             {firstName:"v",lastName:"p",designation:"CTO",type:"manager"},
    //                             {firstName:"p",lastName:"c",designation:"CDO",type:"manager"}],
    //                     developer:[{firstName:"d",lastName:"k",designation:"sd",type:"developer"},
    //                             {firstName:"s",lastName:"j",designation:"jd",type:"developer"},
    //                             {firstName:"a",lastName:"g",designation:"sd",type:"developer"}],
    //                     tester:[{firstName:"m",lastName:"g",designation:"st",type:"tester"}]
    // };
    var EMP_LIST_OBJ = new EmployeeList();
    var UNDO_LIST = new UndoStack(3);
    var EMP_ID = 1;
    var EMP_TO_EDIT;
    var a = 10;
    var b = [1, 2, 3, 4, 5];
    function abc() {
        return "hello world";
    }
    function ab1c() {
        return "hello world";
    }
    //var declaration
    var $empTypeModal, $btnSaveModalEmployeeType, $btnCloseModalEmployeeType, $ulRemoveEmployeeType; //Add or remove Employee type
    var $empModal, $btnCloseModalEmployee, $btnSaveModalEmployee, $ulEmployeeType, $txtNewEmployeeName, $txtNewEmployeeDesignation; //Add or Edit employee 
    var $divButtonSetBottom, $ulEmployeeList, $btnAddEmpForm, $btnEditEmpForm, $btnUndoEmpForm, $btnRemoveEmpForm; //bottom button set 
    var $btnCreateEmpType, $btnRemoveEmpType; //button to create new EMployee type
    //var definition
    //To handle new Emp Type
    $btnCreateEmpType = $('#btnCreateEmployeeType');
    $btnRemoveEmpType = $('#btnRemoveEmployeeType');
    $empTypeModal = $('#modalEmployeeType');
    $btnSaveModalEmployeeType = $('#btnSaveModalEmployeeType');
    $btnCloseModalEmployeeType = $('#btnCloseModalEmployeeType');
    $ulRemoveEmployeeType = $('#ulRemoveEmployeeType');
    //To handle new Emp 
    $empModal = $('#modalEmployee');
    $btnCloseModalEmployee = $('#btnCloseModalEmployee');
    $btnSaveModalEmployee = $('#btnSaveModalEmployee');
    $ulEmployeeType = $('#ulEmployeeType');
    $txtNewEmployeeName = $('#txtNewEmployeeName');
    $txtNewEmployeeDesignation = $('#txtNewEmployeeDesignation');
    $divButtonSetBottom = $('#divButtonSetBottom');
    $ulEmployeeList = $('#ulEmployeeList');
    $btnUndoEmpForm = $('#btnUndoEmpForm');
    $btnRemoveEmpForm = $('#btnRemoveEmpForm');
    //function definitions
    //functions to handle local storage
    function getDataFromLocalStorage() {
        if (window.localStorage.getItem('EMP_TYPE_LIST') != undefined) {
            var empTypeListStored = JSON.parse(window.localStorage.getItem('EMP_TYPE_LIST'));
            EMP_ID = JSON.parse(window.localStorage.getItem('EMP_ID'));
            for (var i = 0; i < empTypeListStored.length; i++) {
                EMP_LIST_OBJ.empTypeList[i] = new EmployeeType(empTypeListStored[i].typeName, empTypeListStored[i].empList);
            }
        }
    }
    function persist() {
        window.localStorage.setItem('EMP_TYPE_LIST', JSON.stringify(EMP_LIST_OBJ.empTypeList));
        window.localStorage.setItem('EMP_ID', JSON.stringify(EMP_ID));
        employeeListSetup();
    }
    //function to handle employee type
    function addNewEmployeeType() {
        $empTypeModal.find('#modalEmployeeTypeTitle').text('Add New Employee Type');
        $('#modalEmployeeType [data-action=remove]').addClass('hidden');
        $('#modalEmployeeType [data-action=add]').removeClass('hidden');
        $empTypeModal.attr('action', 'add');
        $empTypeModal.modal('show');
    }
    function removeEmployeeType() {
        $empTypeModal.find('#modalEmployeeTypeTitle').text('Remove Existing Employee Type');
        $ulRemoveEmployeeType.empty();
        for (var index = 0; index < EMP_LIST_OBJ.empTypeList.length; index++) {
            $ulRemoveEmployeeType.append($('<li>').text(EMP_LIST_OBJ.empTypeList[index].typeName)).on('click', changeEmployeeTypeDDText);
        }
        $('#modalEmployeeType [data-action=add]').addClass('hidden');
        $('#modalEmployeeType [data-action=remove]').removeClass('hidden');
        $empTypeModal.attr('action', 'remove');
        $empTypeModal.modal('show');
    }
    function modalEmployeeTypeSaveChangeHandler() {
        if ($empTypeModal.attr('action') == 'add') {
            var newType = $('#txtNewEmployeetype').val();
            EMP_LIST_OBJ.addTypeInList(new EmployeeType(newType));
            $btnCloseModalEmployeeType.click();
        }
        else {
            var typeToRemove_1 = $('#dLabel').text();
            var indexOfTypeToRemove = EMP_LIST_OBJ.empTypeList.findIndex(function (obj, indx, a) {
                return a[indx].typeName === typeToRemove_1;
            });
            if (indexOfTypeToRemove != -1) {
                EMP_LIST_OBJ.empTypeList.splice(indexOfTypeToRemove, 1);
            }
        }
        $empTypeModal.find('input,button').val('');
        $empTypeModal.modal('hide');
        persist();
    }
    function changeEmployeeTypeDDText() {
        $('#dLabel').text(event.srcElement.textContent);
    }
    function changeEmployeeTypeDD2Text() {
        $('#dLabelModalEmployee').text(event.srcElement.textContent);
    }
    //To handle edit and addition of new emp
    function employeeChangeHandler() {
        if ($(this).attr('action') == 'add') {
            $ulEmployeeType.empty();
            for (var index = 0; index < EMP_LIST_OBJ.empTypeList.length; index++) {
                $ulEmployeeType.append($('<li>').text(EMP_LIST_OBJ.empTypeList[index].typeName)).on('click', changeEmployeeTypeDD2Text);
            }
            $empModal.attr('action', 'add');
            $empModal.modal('show');
        }
        else if ($(this).attr('action') == 'edit') {
            if (EMP_TO_EDIT != null) {
                $ulEmployeeType.empty();
                for (var index = 0; index < EMP_LIST_OBJ.empTypeList.length; index++) {
                    $ulEmployeeType.append($('<li>').text(EMP_LIST_OBJ.empTypeList[index].typeName)).on('click', changeEmployeeTypeDD2Text);
                }
                $empModal.attr('action', 'edit');
                $txtNewEmployeeName.val(EMP_TO_EDIT.name);
                $txtNewEmployeeDesignation.val(EMP_TO_EDIT.designation);
                $('#dLabelModalEmployee').text(EMP_TO_EDIT.type);
                $empModal.modal('show');
            }
            else {
                window.alert('Choose an employee first');
            }
        }
        event.preventDefault();
    }
    function modalEmployeeSaveChangeHandler() {
        if ($empModal.attr('action') == 'add') {
            var typeToAdd_1 = $('#dLabelModalEmployee').text();
            var indexOfTypeToAdd = EMP_LIST_OBJ.empTypeList.findIndex(function (obj, indx, a) {
                return a[indx].typeName === typeToAdd_1;
            });
            if (indexOfTypeToAdd != -1) {
                var empToAdd = new Employee($txtNewEmployeeName.val(), $txtNewEmployeeDesignation.val(), typeToAdd_1);
                EMP_LIST_OBJ.empTypeList[indexOfTypeToAdd].addEmployeeInType(empToAdd);
                UNDO_LIST.addEmpInUndoList(empToAdd);
            }
        }
        else {
            if (EMP_TO_EDIT != undefined) {
                var id = EMP_TO_EDIT.id;
                EMP_TO_EDIT.name = $txtNewEmployeeName.val();
                EMP_TO_EDIT.designation = $txtNewEmployeeDesignation.val();
                if (EMP_TO_EDIT.type != $('#dLabelModalEmployee').text()) {
                    var oldType_1 = EMP_TO_EDIT.type;
                    var indexOfOldType = EMP_LIST_OBJ.empTypeList.findIndex(function (obj, indx, a) {
                        return a[indx].typeName === oldType_1;
                    });
                    EMP_LIST_OBJ.empTypeList[indexOfOldType].removeEmployeeFromType(EMP_TO_EDIT);
                    EMP_TO_EDIT.type = $('#dLabelModalEmployee').text();
                    var indexOfNewType = EMP_LIST_OBJ.empTypeList.findIndex(function (obj, indx, a) {
                        return a[indx].typeName === EMP_TO_EDIT.type;
                    });
                    EMP_LIST_OBJ.empTypeList[indexOfNewType].addEmployeeInType(EMP_TO_EDIT);
                }
            }
        }
        $empModal.find('input,button').val('');
        $empModal.modal('hide');
        persist();
    }
    function empToEdit() {
        var id = parseInt($(this).attr('empId'));
        if (id != null) {
            EMP_LIST_OBJ.empTypeList.map(function (et, indx, etlist) {
                et.empList.map(function (emp, index, emplist) {
                    if (emp.id === id) {
                        EMP_TO_EDIT = emp;
                    }
                });
            });
        }
    }
    function undoAddedEmployee() {
        var empToRemove = UNDO_LIST.removeEmpFromUndoList();
        if (empToRemove == null) {
            window.alert('Undo Stack is empty try adding some employee and then perform operation');
            return;
        }
        var empTypeToRemoveList;
        EMP_LIST_OBJ.empTypeList.map(function (et, indx, etlist) {
            if (et.typeName == empToRemove.type) {
                empTypeToRemoveList = et;
            }
        });
        empTypeToRemoveList.removeEmployeeFromType(empToRemove);
        persist();
    }
    function removeAddedEmployee() {
        if (EMP_TO_EDIT != undefined) {
            var oldType_2 = EMP_TO_EDIT.type;
            var indexOfOldType = EMP_LIST_OBJ.empTypeList.findIndex(function (obj, indx, a) {
                return a[indx].typeName === oldType_2;
            });
            EMP_LIST_OBJ.empTypeList[indexOfOldType].removeEmployeeFromType(EMP_TO_EDIT);
            persist();
        }
    }
    //Handling Employee list and type visible in right Div
    function employeeListSetup() {
        $('#divEmployeeType').html("");
        EMP_LIST_OBJ.empTypeList.map(function (et, indx, etlist) {
            $('#divEmployeeType').append($('<button>').text(et.typeName).attr({ "class": 'btn-top', "data-index": indx, "value": et.typeName }).on('click', changeEmployeeList));
        });
        var $firstType = $('#divEmployeeType button').eq(0);
        if ($firstType != undefined) {
            $firstType.click();
        }
    }
    function changeEmployeeList() {
        EMP_TO_EDIT = undefined;
        var indx;
        indx = parseInt($(this).attr("data-index"));
        $ulEmployeeList.empty();
        if (EMP_LIST_OBJ.empTypeList[indx] != undefined) {
            EMP_LIST_OBJ.empTypeList[indx].empList.map(function (emp, idx, emplist) {
                $ulEmployeeList.append($('<li>').text(emplist[idx].name).attr('empId', emp.id).on('click', empToEdit));
            });
        }
    }
    //To initialize page
    function init() {
        getDataFromLocalStorage();
        $btnCreateEmpType.on('click', addNewEmployeeType);
        $btnRemoveEmpType.on('click', removeEmployeeType);
        $btnSaveModalEmployeeType.on('click', modalEmployeeTypeSaveChangeHandler);
        $('#ulRemoveEmployeeType li').on('click', changeEmployeeTypeDDText);
        $('#divButtonSetBottom button[action]').on('click', employeeChangeHandler);
        $btnSaveModalEmployee.on('click', modalEmployeeSaveChangeHandler);
        $('#ulEmployeeType li').on('click', changeEmployeeTypeDD2Text);
        $('#ulEmployeeList li').on('click', empToEdit);
        $btnUndoEmpForm.on('click', undoAddedEmployee);
        $btnRemoveEmpForm.on('click', removeAddedEmployee);
        employeeListSetup();
    }
    //init
    init();
})();

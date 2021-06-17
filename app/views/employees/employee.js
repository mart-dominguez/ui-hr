angular.module('hrApp').
component('employeeForm',{
    transclude: true,
	templateUrl: 'employees/employee.html',
  	controller:["EmployeeServiceHttp" ,function(platoService){
          this.employees = [{id:1,name:"mart",salary:99.6}];
  	}],
});
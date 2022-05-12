const data = [
	// {
	// 	"quesTypeId": 2,
	// 	"name": "Check Box",
	// 	"icon": "fa-check-square-o",
	// 	"quesDesc": "Please select from the following options",
	// 	"topDragStyle": false,
	// 	"bottomDragStyle": false,
	// 	"focus": false,
	// 	"mouseenter": false,
	// 	"mouseDownMoving": false,
	// 	"showSeq": false,
	// 	"seqNo": 1,
	// 	"tooltip": null,
	// 	"identify": '',
	// 	"layout": 1,
	// 	"questionId": "a9b782b3-425d-4478-be9d-ba06bb6bc264",
	// 	"options": [
	// 		{
	// 			"optionId": "ac304c6e-d483-4cff-a309-2cfdf5e67b45",
	// 			"optionDesc": "Option 1",
	// 			"showOperateBtn": false,
	// 			"focus": false
	// 		},
	// 		{
	// 			"optionId": "5c254a66-9c5e-4205-8ea0-a9cbc2e1bc63",
	// 			"optionDesc": "Option 2",
	// 			"showOperateBtn": false,
	// 			"focus": false
	// 		}
	// 	],
	// 	"validations": [
	// 		{
	// 			"valiTypeId": 1,
	// 			"valiTypeDesc": "Mandontary",
	// 			"valiExpress": null,
	// 			"ValiMess": ""
	// 		}
	// 	]
	// },
	// {
	// 	"quesTypeId": 1,
	// 	"name": "Radio",
	// 	"icon": "fa-dot-circle-o",
	// 	"quesDesc": "Please select an option",
	// 	"topDragStyle": false,
	// 	"bottomDragStyle": false,
	// 	"focus": false,
	// 	"mouseenter": false,
	// 	"mouseDownMoving": false,
	// 	"questionId": "1868b6b9-2c1d-4c83-80d9-24534e8bb980",
	// 	"showSeq": false,
	// 	"seqNo": 2,
	// 	"tooltip": null,
	// 	"identify": '',
	// 	"layout": 1,
	// 	"options": [
	// 		{
	// 			"optionId": "fcada474-aafe-4c8e-9c0f-7553f8b09f69",
	// 			"optionDesc": "Option 1",
	// 			"showOperateBtn": false,
	// 			"focus": false
	// 		},
	// 		{
	// 			"optionId": "8e5fc28d-7fed-4a3d-a661-bad1b81987d3",
	// 			"optionDesc": "Option 2",
	// 			"showOperateBtn": false,
	// 			"focus": false
	// 		}
	// 	],
	// 	"validations": []
	// },
	// {
	// 	"quesTypeId": 6,
	// 	"name": "Text",
	// 	"icon": "fa-text-width",
	// 	"quesDesc": "Please fill in this item",
	// 	"topDragStyle": false,
	// 	"bottomDragStyle": false,
	// 	"focus": false,
	// 	"mouseenter": false,
	// 	"mouseDownMoving": false,
	// 	"showSeq": false,
	// 	"seqNo": 3,
	// 	"tooltip": 'I think we should do something',
	// 	"identify": 'maxkt',
	// 	"layout": 1,
	// 	"questionId": "feff7d64-46da-4839-815b-d549ae0a8314",
	// 	"options": [],
	// 	"validations": []
	// },
	// {
	// 	"quesTypeId": 3,
	// 	"name": "Drop down Select",
	// 	"icon": "fa-caret-square-o-down",
	// 	"questionId": "776b704a-c5d3-430f-bc2e-2a2ebda43210",
	// 	"quesDesc": "Please select from the list below",
	// 	"topDragStyle": false,
	// 	"bottomDragStyle": false,
	// 	"focus": false,
	// 	"mouseenter": false,
	// 	"mouseDownMoving": false,
	// 	"showSeq": false,
	// 	"seqNo": 4,
	// 	"tooltip": null,
	// 	"identify": '',
	// 	"layout": 3,
	// 	"options": [
	// 		{
	// 			"optionId": "efa28af2-a0fe-4b57-b420-52cde7ea8c38",
	// 			"optionDesc": "Option 1",
	// 			"showOperateBtn": false,
	// 			"focus": false
	// 		},
	// 		{
	// 			"optionId": "e320cd4d-f6d3-4450-b97c-a1157d704114",
	// 			"optionDesc": "Option 2",
	// 			"showOperateBtn": false,
	// 			"focus": false
	// 		}
	// 	],
	// 	"validations": []
	// },
	// {
	// 	"quesTypeId": 7,
	// 	"name": "TextArea",
	// 	"icon": "fa-paragraph",
	// 	"questionId": "122c3d34-e332-4129-8c46-d4f8ed8f8423",
	// 	"quesDesc": "Please fill in this item",
	// 	"topDragStyle": false,
	// 	"bottomDragStyle": false,
	// 	"focus": false,
	// 	"mouseenter": false,
	// 	"mouseDownMoving": false,
	// 	"showSeq": false,
	// 	"seqNo": 5,
	// 	"tooltip": null,
	// 	"identify": "",
	// 	"layout": 3,
	// 	"options": [],
	// 	"validations": [
	// 		{
	// 			"valiTypeId": 2,
	// 			"valiTypeDesc": "MaxLength",
	// 			"valiExpress": 500,
	// 			"ValiMess": ""
	// 		}
	// 	]
	// },
	// {
	// 	"quesTypeId": 6,
	// 	"name": "Text",
	// 	"icon": "fa-text-width",
	// 	"questionId": "fca39b10-d598-4f82-8741-ee8ff9b151a7",
	// 	"quesDesc": "Please fill in this item",
	// 	"topDragStyle": false,
	// 	"bottomDragStyle": false,
	// 	"focus": false,
	// 	"mouseenter": false,
	// 	"mouseDownMoving": false,
	// 	"showSeq": false,
	// 	"seqNo": 6,
	// 	"tooltip": null,
	// 	"identify": "",
	// 	"layout": 3,
	// 	"options": [],
	// 	"optSet": {
	// 		"defaultValue": "@qq.com"
	// 	},
	// 	"validations": [
	// 		{
	// 			"valiTypeId": 2,
	// 			"valiTypeDesc": "MaxLength",
	// 			"valiExpress": 200,
	// 			"ValiMess": ""
	// 		},
	// 		{
	// 			"valiTypeId": 3,
	// 			"valiTypeDesc": "MinLength",
	// 			"valiExpress": 100,
	// 			"ValiMess": ""
	// 		},
	// 		{
	// 			"valiTypeId": 4,
	// 			"valiTypeDesc": "Email",
	// 			"valiExpress": null,
	// 			"ValiMess": "Please enter the correct email account"
	// 		}
	// 	]
	// }
];

const info = {
	projectName: '',
	showTitle: true,
	showQNumber: false,
	showWel: true,
	showProgress: false,
	showHeader: true,
	headerType: 'text',
	headerTxt: '',
	headerPic: [],
	bgColor: '#FFFFFF',
	bColor: '#FFFFFF',
	bOpacity: 100,
	templateId: null,
	enablePagelayout: false
}

export default {
    getProject: () => {
        const res = {
            "status": 200,
            "success": true,
            "msg": "successful",
            "response": {
				info: info,
                qList: data
            }
        }
        return res;
    }
}

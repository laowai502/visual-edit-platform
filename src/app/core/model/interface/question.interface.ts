// ------------------------------------------- Edit ques model ------------------------------------
interface QuesWholeOptionSettingModel {
	optionLayout?: number;
	selectEnableSearch?: boolean;
	canCheckAll?: boolean;
	defaultValue?: string;
	serverUrl?: string;
	enableSelectTime?: boolean;
	dateFormatType?: any;
}

export interface EditQuestionModel {
	// main
	questionId: string;
	quesTypeId: number;
	quesDesc?: string;
	readonly name: string; // type name content
	// style
	icon?: string;
	topDragStyle?: boolean;
	bottomDragStyle?: boolean;
	focus?: boolean;
	mouseenter?: boolean;
	mouseDownMoving?: boolean;
	// the whole setting
	seqNo: any;
	showSeq: boolean;
	tooltip: string;
	identify: string;
	layout: number;
	// option
	options?: Array<Option|PointOption|ScoreOption|FileOption>;
	optSet?: QuesWholeOptionSettingModel;
	// validation
	validations?: Array<Vali>;
}

export interface EditScaleQuesModel extends EditQuestionModel {
	extremeLeftText: string;
	extremeRightText: string;
	centerText?: string;
	extremeKey: any;
	scaleLevel: number;
	startLevelValue: number;
}
// ------------------------------------------- Edit ques model (end) ------------------------------------

// ------------------------------------------- Option model  ------------------------------------
export interface Option {
	optionId: string;
	optionDesc: string;
	focus?: boolean;
	optsMoving?: boolean;
	showOperateBtn?: boolean;
}

export interface FileOption extends Option {
	limit: number;
	amount: number;
	formatLimit: any;
}

// If the type of question is Scale question, 'point' means basic points for each level
export interface PointOption extends Option {
	point?: number;
}

export interface ScoreOption extends Option {
	minValue?: number;
	maxValue?: number;
	lText?: string;
	cText?: string;
	rText?: string;
}
// ------------------------------------------- Option model (end) ------------------------------------

export interface Vali {
	valiTypeId: number;
	valiTypeDesc: string;
	valiExpress: any;
	ValiMess?: string;
}


export interface EditQuestionInfor {
	readonly id?: string;
	readonly projectId: string;
	status: string; // enable | disable
	dataCollection: Array<EditScaleQuesModel | EditQuestionModel>;
}

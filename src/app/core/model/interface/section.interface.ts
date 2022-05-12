import { EditQuestionModel, EditScaleQuesModel } from './question.interface';

export interface EditSectionPanelModel {
	name: string;
	level: number;
	active?: boolean;
	cIndex?: string;
	children: Array<EditSectionPanelModel | EditQuestionModel | EditScaleQuesModel>;
}

export interface EditSectionModel {
	readonly id?: string;
	level: number;
	icon?: string;
	title: string;
	children?: Array<EditSectionModel>;
	content?: Array<EditSectionPanelModel | EditQuestionModel | EditScaleQuesModel>;
	open?: boolean;
	selected?: boolean;
	disabled?: boolean;
	type?: string;
}

export interface EditSectionInfo {
	readonly id?: string;
	readonly projectId: string;
	status: string;
	editSectionData: Array<EditSectionModel>;
	editQuestionsWaitList: Array<EditQuestionModel | EditScaleQuesModel>
}

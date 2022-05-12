export interface ProjectInfo {
	readonly id?: string;
	projectName: string;
	showTitle: boolean,
	showQNumber: boolean,
	showWel: boolean,
	showProgress: boolean,
	showHeader: boolean,
	headerType: string,
	headerTxt: string,
	headerPic: Array<string>;
	bgColor: string;
	bColor: string;
	bOpacity: number;
	enablePagelayout: boolean;
	templateId?: number;
}

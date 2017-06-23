export interface iVideo {
  url: string;
}

export interface iSubject {
  name: string;
  branch?: string;
  domain?: string;
  current?: boolean;
  index?: number;
  branchIndex?: number;
  completed: boolean;
  video: iVideo;
}

export interface iBranch {
  name: string;
  subjects: iSubject[];
  open?: boolean;
  amount?: number;
  completed?: number;
  index?: number;
}

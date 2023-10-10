export interface StatusType {
  id: string;
  name: string;
}

export interface Status {
  id: string;
  type: string;
  name: string;
  date: Date;
  completed: boolean;
  username: string;
}

export interface Achievement {
  name: string;
  description: string;
  image: string;
  color: string;
  date: Date;
  occurence: number;
}

export interface Quote {
  id: string;
  quote: string;
  username: string;
  date: Date;
  reactions: Reaction[];
}

export interface Reaction {
  id: string;
  emoji: string;
  isMine: boolean;
}

export interface SmallReaction {
  emoji: string;
  count: number;
}

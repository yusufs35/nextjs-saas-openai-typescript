interface Profile {
	credits: number;
	uid: string;
}


type ProfileReturnType = WithId<Document> | Object | null;
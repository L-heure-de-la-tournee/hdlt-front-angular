export const environment = {
    //GENERAL (the actual values are in the .env file since they are the only ones that are "secret")
	API_URL : process.env['NG_APP_API_URL'] ? process.env['NG_APP_API_URL'] :'https://example.com/v1',
	PROJECT_ID : process.env['NG_APP_PROJECT_ID'] ? process.env['NG_APP_PROJECT_ID'] :'example_project_id',
	DATABASE_ID : process.env['NG_APP_DATABASE_ID'] ? process.env['NG_APP_DATABASE_ID'] :'example_database_id',

	//COLLECTIONS
	STATUS_TYPE:"64775270510d7823d9e6",
	STATUS:"6477526773c1222c052a"

};

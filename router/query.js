module.exports = {
	insertGenerator : function(table, data) {
		/*
		data = {'columnName' : {'type' : 'int', 'val' : 'val'}}
		type은 int or str
		*/
		let query = 'insert into ' + table + '(';

		let colNames = new Array();
		let types = new Array();
		let values = new Array();
		let cnt = 0;

		for(let col in data)
		{
			if(data.hasOwnProperty(col))
			{
				let type = data[col]['type'];
				let val = data[col]['val'];

				colNames.push(col);
				types.push(type);
				values.push(val)
				cnt++;
			}
		}

		let colPart = '';
		let valPart = '';

		for(let i=0; i<cnt; i++)
		{
			colPart += colNames[i];
			if(types[i] == 'str') valPart += '\"' + values[i] + '\"';
			else valPart += values[i];

			if(i < cnt - 1) // not last element
			{
				colPart += ',';
				valPart += ',';
			}
		}

		query += colPart + ') values(' + valPart + ');';

		return query;
	},
};
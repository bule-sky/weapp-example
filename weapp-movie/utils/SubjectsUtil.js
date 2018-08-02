/*
* @Author: shadowmon
* @Date:   2018-06-02 19:41:53
* @Last Modified by:   shadowmon
* @Last Modified time: 2018-06-02 23:42:22
*/
  let _api = "https://douban.uieee.com";
	function processSubject(subjects) {
    var title = subjects.title;
    var directors = subjects.directors; //导演
    var directorStr = ""
    for (var index in directors) {
      directorStr = directorStr + directors[index].name+" / ";
    }
    if(directorStr != "") {
      directorStr = directorStr.substring(0,directorStr.length-2);
    }

    var casts = subjects.casts; //主演
    var castStr = ""
    for (var index in casts) {
      castStr = castStr + casts[index].name+" / ";
    }
    if(castStr != "") {
      castStr = castStr.substring(0,castStr.length-2);
    }

    var genres = subjects.genres; //影片类型
    var genreStr = ""
    for (var index in genres) {
      genreStr = genreStr + genres[index]+" / ";
    }
    if(genreStr != "") {
      genreStr = genreStr.substring(0,genreStr.length-2);
    }
    var year = subjects.year; //年份
    var text = "名称："+title+"\n导演："+directorStr+"\n主演："+castStr+"\n类型："+genreStr+"\n上映年份："+ year+"(中国大陆)";
    subjects.text = text;
	}
  
	function processSubjects(subjects) {
      for (var i = 0; i < subjects.length; i++) {
        var subject = subjects[i];
        this.processSubject(subject);
      }
	}


module.exports = {
  _api,
	processSubject,
	processSubjects
}

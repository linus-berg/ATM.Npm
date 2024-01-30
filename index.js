var ChangesStream = require('changes-stream');
var axios = require('axios');

var changes = new ChangesStream({
  db: 'https://replicate.npmjs.com/registry',
  include_docs: true,
  since: 'now'
});

changes.on('data', function (change) {
  var name = change.doc.name
  if(name){
    console.log(name);
    PostToTracker(name);
  }
});
// Random comment
const PostToTracker = async (artifact) => {
  try {
    const res = await axios.post("http://localhost:4001/api/artifact/track", {
      module: 'npm',
      artifact: artifact
    }); 
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

exports.formatDates = list => {
  return list.map(obj => {
    const newObj = { ...obj };
    newObj.created_at = new Date(newObj.created_at);
    return newObj;
  });
};

exports.makeRefObj = list => {
  const refObj = {};
  list.forEach(obj => {
    refObj[obj.title] = obj.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(obj => {
    const newObj = { ...obj };
    newObj["author"] = newObj.created_by;
    delete newObj.created_by;
    newObj.created_at = new Date(newObj.created_at);
    newObj["article_id"] = articleRef[newObj.belongs_to];
    delete newObj.belongs_to;
    return newObj;
  });
};

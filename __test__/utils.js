
const combine = a => {
  const fn = (n, src, got, all) => {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (let j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  };
  const all = [];
  for (let i=0; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
};

function titleize(sentence) {
  if(!sentence.split) return sentence;
  var _titleizeWord = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    result = [];
  sentence.split(' ').forEach(function(w) {
    result.push(_titleizeWord(w));
  });
  return result.join(' ');
}

export {
  combine,
  titleize
};
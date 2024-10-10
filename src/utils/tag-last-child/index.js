export default function tagLastChild(list) {
  const lastParentIndex = {};

  list.forEach((item, index) => {
    const parentId = item.parent._id;
    lastParentIndex[parentId] = index;
  });

  return list.map((item, index) => {
    const parentId = item.parent._id;
    const isLast = lastParentIndex[parentId] === index;

    return { ...item, last: isLast };
  });
}
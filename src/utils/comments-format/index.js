import datesFormat from "../dates-format"
import listToTree from "../list-to-tree"
import tagLastChild from "../tag-last-child"
import treeToList from "../tree-to-list"

export default function commentsFormat(list) {
  const formattedList = treeToList(listToTree(list), (item, level) => ({
    ...item,
    level: level - 1,
    dateCreate: datesFormat(item.dateCreate)
  })).slice(1)
  return tagLastChild(formattedList);
}
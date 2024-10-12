import datesFormat from "../dates-format"
import listToTree from "../list-to-tree"
import treeToList from "../tree-to-list"

/**
 * Форматирование комментариев
 * @returns {Array}
 */
export default function commentsFormat(list, commentSpace) {
  const fullList = commentSpace === null ? list : [...list, commentSpace];

  const formattedList = treeToList(listToTree(fullList), (item, level) => ({
    ...item,
    level: level - 1,
    dateCreate: datesFormat(item.dateCreate)
  })).slice(1)
  return formattedList;
}
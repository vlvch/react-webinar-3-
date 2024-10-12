import { useState, useMemo, useEffect } from 'react';
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n } = useServices();
  const [lang, setLangState] = useState(i18n.getLang());

  useEffect(() => {
    const unsubscribe = i18n.subscribe(setLangState);
    return () => unsubscribe();
  }, []);

  const t = useMemo(() => (key, number) => i18n.t(key, number), [lang]);

  return { lang, setLang: i18n.setLang, t };
}

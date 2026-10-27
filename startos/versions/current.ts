import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.37.2:1',
  releaseNotes: {
    en_US:
      'An external library can now mount just one folder of NextExplorer, FileBrowser Quantum or Nextcloud instead of its whole storage; set it under **External Libraries**. A library that cannot be mounted, because its service is not installed or the folder is missing, is left out and named by a health check while Audiobookshelf runs.',
    es_ES:
      'Una biblioteca externa ahora puede montar solo una carpeta de NextExplorer, FileBrowser Quantum o Nextcloud en lugar de todo su almacenamiento; configúrala en **Bibliotecas externas**. Una biblioteca que no se puede montar, porque su servicio no está instalado o falta la carpeta, se omite y una comprobación de estado la indica mientras Audiobookshelf sigue funcionando.',
    de_DE:
      'Eine externe Bibliothek kann jetzt nur einen Ordner von NextExplorer, FileBrowser Quantum oder Nextcloud statt des gesamten Speichers einbinden; legen Sie ihn unter **Externe Bibliotheken** fest. Eine Bibliothek, die sich nicht einbinden lässt, weil ihr Dienst nicht installiert ist oder der Ordner fehlt, wird ausgelassen und von einer Zustandsprüfung benannt, während Audiobookshelf weiterläuft.',
    pl_PL:
      'Biblioteka zewnętrzna może teraz montować tylko jeden folder NextExplorer, FileBrowser Quantum lub Nextcloud zamiast całego magazynu; ustaw go w **Biblioteki zewnętrzne**. Biblioteka, której nie można zamontować, bo jej usługa nie jest zainstalowana lub brakuje folderu, jest pomijana i wskazywana przez kontrolę stanu, a Audiobookshelf działa dalej.',
    fr_FR:
      'Une bibliothèque externe peut désormais monter un seul dossier de NextExplorer, FileBrowser Quantum ou Nextcloud au lieu de tout son stockage ; définissez-le dans **Bibliothèques externes**. Une bibliothèque qui ne peut pas être montée, parce que son service n’est pas installé ou que le dossier manque, est ignorée et signalée par une vérification d’état pendant qu’Audiobookshelf continue de fonctionner.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})

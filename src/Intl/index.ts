import errors from './errors'
import model from './model'
import models from './models'

const translations = {
  "errors": errors,
  "language": ["Language", "Язык"],
  "navigation": {
    "home": ["Home", "Главная"],
    "models": ["Models", "Модели"],
    "howto": ["How to use", "Как использовать"],
    "tos": ["Terms of use", "Условия использования"],
    "application": ["Application", "Приложение"]
  },
  "pages": {
    "application": {
      "title": ["Meshhouse application", "Приложение Meshhouse"],
      "lead": [
        "Meshhouse - open-source 3D catalogizer program, built with Electron. <b>100% optional</b>", 
        "Meshhouse - галерея 3D моделей с открытым исходным кодом, сделанный на Electron. <b>100% опционально</b>"
      ],
      "featureTitle": ["Features:", "Возможности:"],
      "featureList": [
        "<li><p class='mb-0'>Meshhouse integration*</p></li><li><p class='mb-0'>Adding custom catalogs (grid and table view)</p></li><li><p class='mb-0'>Filter through your models collection</p></li><li><p class='mb-0'>Localization support</p></li>", 
        "<li><p class='mb-0'>Интеграция с сервисом Meshhouse*</p></li><li><p class='mb-0'>Добавление своих каталогов моделей (вид сеткой и таблицей)</p></li><li><p class='mb-0'>Сортируйте модели в вашей коллекции</p></li><li><p class='mb-0'>Поддержка локализации</p></li>"
      ],
      "note": ["* - currently not implemented.", "* - пока не реализовано."],
      "platforms": ["Supported platforms:", "Поддерживаемые платформы:"],
      "platformWin": ["Windows 7-10 (x64 only)", "Windows 7-10 (только x64)"],
      "platformMac": ["MacOS 10.10 Yosemite and newer", "MacOS 10.10 Yosemite и новее"],
      "platformLinux": ["Ubuntu 12.04, Fedora 21, Debian 8 and newer", "Ubuntu 12.04, Fedora 21, Debian 8 и новее"],
      "localize": ["Localizations:", "Локализации:"],
      "status": [
        "Currently in development, but you can build application by own:",
        "На данный момент программа в разработке, но вы можете собрать приложение самому:"
      ],
      "link": ["Github repo", "Репозиторий Github"]
    },
    "home": {
      "title": ["3d models catalog, free for commercial use", "Каталог 3d моделей, бесплатно для коммерческого использования"],
      "description": ["Alpha test (with demo database)", "Альфа тест (с демонстрационной базой данных)"],
      "link": [
        "Courtesy of <a href='https://pixabay.com/en/users/enriquelopezgarre-3764790/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4480996'>enriquelopezgarre</a> from <a href='https://pixabay.com/en/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4480996'>Pixabay</a>",
        "Изображение <a href='https://pixabay.com/ru/users/enriquelopezgarre-3764790/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4480996'>enriquelopezgarre</a> с сайта <a href='https://pixabay.com/ru/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4480996'>Pixabay</a>"
      ]
    },
    "howto": {
      "title": ["How to use models", "Как использовать модели"],
      "tabs": {
        "max": {
          "alert": [
            "For properly model import you need to add path to textures in 'Customize -> Configure User Paths -> External Files'. Instructions will be given for 3ds Max 2016.",
            "Для корректного импорта модели необходимо сначала прописать пути к текстурам в 'Customize -> Configure User Paths -> External Files'. Инструкции будут даны для 3ds Max 2016."
          ],
          "titleMerge": ["Variant 1 - Merge to scene", "Вариант 1 - Слияние с текущей сценой"],
          "titleXref": ["Variant 2 - xRef", "Вариант 2 - xRef"],
          "mergeList": [
            "<li>+ Full control on model and materials</li><li>- Changes in original model need to import again in current scene</li>",
            "<li>+ Полный контроль над моделью и материалами</li><li>- Изменения, внесенные в оригинальную модель нужно заново импортировать в сцену</li>"
          ],
          "mergeText": [
            "For merge model with scene you need to click 'File' (or click on 3ds Max icon) -> 'Import' -> 'Merge' and select file.",
            "Для слияния модели со сценой необходимо зайти в 'File' (либо нажать на иконку 3ds Max) -> 'Import' -> 'Merge' и выбрать необходимый файл."
          ],
          "xrefList": [
            "<li>+ Smaller scene size</li><li>+ Can use proxy to improve FPS</li><li>+ Changes in xRef syncs with all scenes</li><li>- Can't edit modifiers in xRef</li>",
            "<li>+ Меньший размер сцены</li><li>+ Возможно использовать прокси для увеличения частоты кадров</li><li>+ Изменения в xRef сихронихируются со всеми сценами</li><li>- Невозможно редактировать модификаторы в xRef</li>"
          ],
          "xrefText1": [
            "For import model as xRef you need to click 'File' (or click on 3ds Max icon) -> 'References' -> 'XRef Objects'",
            "Для импорта модели как xRef необходимо зайти в 'File' (либо нажать на иконку 3ds Max) -> 'References' -> 'XRef Objects'"
          ],
          "xrefText2": [
            "Choose preset 'Static Assets' then click on button in left upper corner (looks like square in curly braces) and select file.",
            "Выберите пресет 'Static Assets', затем нажмите на кнопку в левом верхнем углу (выглядит как квадрат в фигурных скобках) и выберите необходимый файл."
          ]
        }
      }
    },
    "models": models,
    "model": model,
    "tos": {
      "title": [
        "Terms of use, privacy policy, DMCA",
        "Условия использования, политика конфиденциальности, DMCA"
      ],
      "summary": ["Summary", "В кратце"],
      "summaryList": [
        "<dt>Website</dt><dd>Meshhouse.ml (or any TLD) is a website that offers a library of different sorts of 3D models (the 'Content')</dd>",
        "<dt>Сайт</dt><dd>Meshhouse.ml (или другой домен третьего уровня) - это сайт, предлагающий библиотеку различных 3D моделей ('Контент')</dd>"
      ],
      "note": ["Text partially available in other languages.", "Текст частично доступен только на английском языке."],
      "useContentTitle": ["Use of Content", "Использование Контента"],
      "privacyTitle": ["Privacy policy", "Политика конфиденциальности"],
      "privacyText": [
        "We don't collect any data. Comma. We think that collecting user data as monetization strategy is a no-way.",
        "Мы не собираем пользовательские данные. Точка. Мы считаем, что сбор пользовательских данных для их монетизации - это путь вникуда."
      ],
      "dmcaTitle": ["DMCA and site content", "Закон об авторских правах и Контент сайта"],
      "dmcaText": [
        "All models on this site made from scratch, not basing on existing models. We can use other model as reference, but even in this case, model would be made from scratch. If you think, that model violates copyrights, you can send message to <a href='mailto:social@longsightedfilms.com'>our email</a> and we delete model.",
        "Все модели на этом сайте сделаны с нуля, не базируясь на уже существующих моделях. Мы можем использовать другую модель как референс, но даже в этом случае модель всё равно будет сделана с нуля. Если вы считаете, что модель нарушает авторские права, вы можете отправить сообщение на <a href='mailto:social@longsightedfilms.com'>нашу почту</a> и мы удалим модель."
      ]
    }
  }
}

export default translations
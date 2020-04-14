import React from 'react'
import { NavLink } from "react-router-dom"
import { Translate } from "react-localize-redux"
import { withLocalize } from "react-localize-redux"
import { getNestedCategories } from 'Functions/Helpers'

import Badge from 'Components/UI/Badge'
import Icon from 'Components/UI/Icon'

function ModelsSidebar (props: any) {
  const lang = props.activeLanguage !== undefined ? props.activeLanguage.code : "en"

  const links = getNestedCategories(props.links)

  return (
    <aside className='models-sidebar'>
      <p className="models-sidebar__header">
        <Translate id="pages.models.categories" />
      </p>
      <nav className="models-sidebar__nav">
        {links !== undefined && links.map((link: any) => (
          <li
            key={link.id}
            className='models-sidebar__navlink'
          >
            <NavLink
              to={{
                pathname: `/models/${link.categorySlug}`,
                state: { categoryId: link.id }
              }}
              className='models-sidebar__link'
              activeClassName='models-sidebar__link--active'
            >
              <Icon
                icon='categories/cat-computers'
                alt={link.categoryName[lang]}
              />
              {link.categoryName[lang]}
              <Badge>{link.modelsCount}</Badge>
            </NavLink>
            {link.subcategories.length !== 0 && (
              <nav>
                {link.subcategories.map((sublink: any) => (
                  <li key={sublink.id}>
                    <NavLink
                      to={{
                        pathname: `/models/${sublink.categorySlug}`,
                        state: { categoryId: sublink.id }
                      }}
                      className='models-sidebar__sublink'
                      activeClassName='models-sidebar__sublink--active'
                    >
                      <Icon
                        icon='categories/cat-computers'
                        alt={sublink.categoryName[lang]}
                      />
                      {sublink.categoryName[lang]}
                      <Badge>{sublink.modelsCount}</Badge>
                    </NavLink>
                  </li>
                ))}
              </nav>
            )}
          </li>
        ))}
      </nav>
    </aside>
  )
}

export default withLocalize(ModelsSidebar)

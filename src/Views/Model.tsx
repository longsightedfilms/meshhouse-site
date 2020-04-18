import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleModel } from 'Store/models/actions'
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Table } from 'reactstrap'
import { getPreviewLink, getImageLink, getDccName } from 'Functions/Helpers'
import { format } from 'date-fns'
import { Translate } from "react-localize-redux"
import LazyLoad from 'react-lazyload'
import '@meshhouse/model-viewer'
import Carousel from 'nuka-carousel'
import Icon from 'Components/UI/Icon'
import Badge from 'Components/UI/Badge'

import hdri from '../Assets/images/hdri/colorful_studio_1k.hdr'

class Model extends React.PureComponent<any, any> {
  componentDidMount() {
    const slug = this.props.match.params.slug
    this.props.fetchSingleModel(slug).then(() => {
      document.title = `${this.props.pageData[0].name} - Meshhouse`
    }).catch(() => {})
  }

  render() {
    let model = this.props.pageData !== undefined ? this.props.pageData[0] : {}
    return (
      <>
        {this.props.pageData !== undefined &&
        <>
          <Carousel
            className='models-slider'
            initialSlideHeight={960}
            dragging={false}
          >
            {model.images !== undefined && model.images.map((image: string, idx: number) => (
              <div
                className='slide-inner'
                key={`slide-${idx}`}
              >
                <LazyLoad>
                  <img src={getImageLink(image)} alt={model.name} />
                </LazyLoad>
              </div>
            ))}
            <div className='slide-inner'>
              <LazyLoad>
                <model-viewer
                  model={getPreviewLink(model.preview)}
                  hdri={hdri}
                  modeltitle={model.name}
                  author="Long-Sighted Films"
                  authorlink="https://longsightedfilms.com"
                  autohide={true}
                  thumbnail={getImageLink(model.thumbnail)}
                >
                  <span slot="loader">
                    <img src={`${process.env.PUBLIC_URL}/assets/icons/logo-icon.svg`} alt="Meshhouse"/>
                  </span>
                  <span slot="logo">
                    <img src={`${process.env.PUBLIC_URL}/assets/icons/logo-icon.svg`} alt="Meshhouse"/>
                  </span>
                </model-viewer>
              </LazyLoad>
            </div>
          </Carousel>
          <header className="models-header">
            <h1>{model.name}</h1>
            <div className="buttons">
              <UncontrolledButtonDropdown>
                <DropdownToggle
                  color="primary"
                  size="lg"
                  caret
                >
                  <Translate id="pages.model.download.modelButton" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>
                    <Translate id="pages.model.download.texturesTitle" />
                  </DropdownItem>
                  <DropdownItem
                    href={model.links.textures}
                    disabled={model.links.textures === null}
                  >
                    <Translate id="pages.model.download.texturesButton" />
                  </DropdownItem>
                  <DropdownItem header>
                    <Translate id="pages.model.download.modelTitle" />
                  </DropdownItem>
                  {model.links.model !== undefined && model.links.model.map((item: any, idx: number) => (
                    <DropdownItem key={idx} href={item.link}>
                      <Icon icon={`programs/${item.dcc}`} />
                      {getDccName(item)} {item.dccVersion} - {item.renderer} ({item.size})
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledButtonDropdown>

              <Button
                id="download-app"
                tag="a"
                color="primary"
                size="lg"
                href={`meshhouse://install/${model.id}`}
              >
                <Icon
                  className="mr-2"
                  icon="logo-icon"
                />
                <Translate id="pages.model.download.application" />
              </Button>
            </div>
          </header>
          <main className="models-description">
            <div className="description">
              {model.brand !== undefined &&
                <div className="legal">
                  <b><Translate id="pages.model.legalNoticeTitle" /></b>
                  <p><Translate id="pages.model.legalNoticeText" data={{ brand: model.brand }} /></p>
                </div>
              }
              {model.tags !== undefined &&
                <>
                <h3>Tags</h3>
                <div className="tags-container">
                  {model.tags.map((tag: any, idx: number) => (
                    <Badge key={`tag-${idx}`}>{tag}</Badge>
                  ))}
                </div>
                </>
              }
            </div>
            <div className="info">
              <Table bordered>
                <tbody>
                  <tr>
                    <th><Translate id="pages.model.date" /></th>
                    <td>{format(model.date, 'dd.MM.yyyy')}</td>
                  </tr>
                  <tr>
                    <th><Translate id="pages.model.polys" /></th>
                    <td>{model.info.polys}</td>
                  </tr>
                  <tr>
                    <th><Translate id="pages.model.verts" /></th>
                    <td>{model.info.verts}</td>
                  </tr>
                  <tr>
                    <th><Translate id="pages.model.hairFur.title" /></th>
                    <td><Translate id={`pages.model.hairFur.${model.info.hairFur}`} /></td>
                  </tr>
                  <tr>
                    <th><Translate id="pages.model.morpher.title" /></th>
                    <td><Translate id={`pages.model.morpher.${String(model.info.morpher)}`} /></td>
                  </tr>
                  <tr>
                    <th><Translate id="pages.model.skinning.title" /></th>
                    <td>{model.info.skinning === 'none' &&
                      <Translate id={`pages.model.skinning.${model.info.skinning}`} />}
                    </td>
                  </tr>
                  <tr>
                    <th><Translate id="pages.model.download.texturesTitle" /></th>
                    <td><Translate id={`pages.model.textures.${model.info.textures}`} /></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </main>
        </>
        }
      </>
    )
  }
}

const mapStateToProps = (state: any) => ({ pageData: state.models.model })

export default connect(
  mapStateToProps,
  { fetchSingleModel }
)(Model)

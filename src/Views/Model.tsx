import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Table } from 'reactstrap'
import { getPreviewLink, getImageLink, getDccName, getStringedArray } from 'Functions/Helpers'
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
    this.props.onFetchSingleModel(slug)
  }

  render() {
    let model = this.props.pageData !== undefined ? this.props.pageData[0] : undefined
    return (
      <>
        {model === undefined && (
          <></>
        )}
        {model !== undefined && (
        <>
          <Helmet>
            <title>{model.name} - Meshhouse</title>
            <script type="application/ld+json">
              {`{
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": "${model.name}",
                "image": [
                  "${getImageLink(model.thumbnail)}",
                  "${getImageLink(model.images[0])}",
                ],
                "description": "${model.info.description}",
                "sku": "MSH-${model.id}",
                "brand": {
                  "@type": "Brand",
                  "name": "Long-Sighted Films"
                },
                "offers": {
                  "@type": "Offer",
                  "url": "${this.props.location.pathname}",
                  "priceCurrency": "USD",
                  "price": "0.00",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": {
                    "@type": "Organization",
                    "name": "Maxim Makarov"
                  }
                }
              }`}
            </script>
          </Helmet>
          <Carousel
            className='models-slider'
            initialSlideHeight={960}
            dragging={false}
          >
            {model.images.map((image: string, idx: number) => (
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
                  {model.links.model.map((item: any, idx: number) => (
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
                href={`meshhouse://install/MSH-${model.id}`}
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
              <>
                {model.brand.length !== 0 && (
                  <>
                    <h3 className="header">
                      <span><Translate id="pages.model.legalNoticeTitle" /></span>
                    </h3>
                    <p>
                      <Translate id="pages.model.legalNoticeText" data={{ brand: getStringedArray(model.brand) }} />
                    </p>
                  </>
                )}
                {model.info.description !== '' && (
                  <>
                    <h3 className="header">
                      <span>Description</span>
                    </h3>
                    <div dangerouslySetInnerHTML={{ __html: model.info.description }} />
                  </>
                )}
                {model.tags.length !== 0 && (
                  <>
                    <h3 className="header">
                      <span>Tags</span>
                    </h3>
                    <div className="tags-container">
                      {model.tags.map((tag: any, idx: number) => (
                        <Badge key={`tag-${idx}`}>{tag}</Badge>
                      ))}
                    </div>
                  </>
                )}
              </>
            </div>
            <div className="info">
              <div className="models-info-card">
                <h3 className="header">Model information</h3>
                <div className="content">
                    <Table bordered>
                      <tbody>
                        <tr>
                          <th>Product id</th>
                          <td>MSH-{model.id}</td>
                        </tr>
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
              </div>
            </div>
          </main>
        </>
        )}
      </>
    )
  }
}

const mapStateToProps = (state: any) => ({ pageData: state.models.model })

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchSingleModel: (params: any) => dispatch({ type: "GET_MODELS_SINGLE", payload: params })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Model)

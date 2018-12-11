import React, { Component } from 'react'
import Section from '../../components/Section'
import Container from '../../components/Container'
import styled from 'styled-components'

const Styledul = styled.ul`
  list-style: none;
  padding-right: 40px;
`
const Styledh4 = styled.h4`
  margin-bottom: 5px;
`
const Styledp = styled.p`
  margin-left: 2rem;
  font-size: 14px;
  margin-top: 5px;
`
class FaqPage extends Component {
  render() {
    return (
      <Container>
        <Section padded>
          <Styledul>
            <li>
              <Styledh4>1.关于Bloc42</Styledh4>
              <Styledp>
                区块链天然需要社区。Bloc42
                致力于搭建一个通用的区块链社区框架，在这个平台上，由用户主导创建社区、组织讨论、推进项目与技术的发展、参与社区治理。
              </Styledp>
            </li>
            <li>
              <Styledh4>2.Why Bloc42?</Styledh4>
              <Styledp>
                首先，IM 工具和社交媒体的属性限制了讨论的深入和沉淀，Bloc42
                的内容呈现方式和 Vote
                机制能让有价值的讨论将沉淀下来，让更多人看到。其次，现有社区形态过于碎片化，没有一个集中可信的平台记录并证明成员对社区的贡献。Bloc42
                是自下而上的社区结构，用户可以自发创建和维护社区，并因此获得社区身份背书。
              </Styledp>
            </li>
            <li>
              <Styledh4>3.愿景</Styledh4>
              <Styledp>打造独一无二的区块链社区身份。</Styledp>
            </li>
            <li>
              <Styledh4>4.如何注册/登录？</Styledh4>
              <Styledp>
                本站仅支持通过以太坊钱包Metamask注册和登录。一个以太坊账户地址对应一个Bloc42账号。
              </Styledp>
            </li>
            <li>
              <Styledh4>5.Bloc42 主要功能</Styledh4>
              <Styledp>
                发帖、回帖、Upvote/Downvote、加入分论坛、创建分论坛等。请勿滥用平台功能，一个健康的社区环境需要大家共同维护。
              </Styledp>
            </li>
            <li>
              <Styledh4>6.Bloc42 鼓励什么类型的帖子？</Styledh4>
              <Styledp>
                Bloc42
                定位是一个讨论平台，请尽量用一段话表达你的想法。我们欢迎观点输出、知识普及、技术讨论、工具分享、活动和招聘类型的帖子。分享链接时，请简单介绍链接里的内容。发帖之前，请给你的帖子取一个信息充裕的标题。
              </Styledp>
            </li>
            <li>
              <Styledh4>7.什么是分论坛？</Styledh4>
              <Styledp>
                分论坛是我们对区块链社区自治一次探索。用户可以自发为区块链话题、项目创建分论坛。创建者需积极维护该分论坛，制定社区发言规则，移除违规帖子和用户，并接受来自社区的建议和监督。
              </Styledp>
            </li>
            <li>
              <Styledh4>8.社区发言注意事项</Styledh4>
              <Styledp>
                禁止讨论政治。禁止发布色情、赌博、暴力、垃圾广告帖子。禁止滥用本社区功能，例如注册水军、攻击他人、发布含有潜在危险的内容。Bloc42
                也不欢迎灌水、无意义和与区块链无关的主题。请让自己的分享对社区有用。Bloc42
                团队会对违规行为执行删帖、删评论、移出社区、删除账号等操作。
              </Styledp>
            </li>
            <li>
              <Styledh4>9.版权规范</Styledh4>
              <Styledp>
                用户在 Bloc42
                发布的原创内容，著作权均归用户本人所有，且默认用户授予 Bloc42
                免费的、不可撤销的、非独家使用许可权。
              </Styledp>
            </li>
            <li>
              <Styledh4>10.免责声明</Styledh4>
              <Styledp>
                Bloc42
                是一个中立的网络，只做价值传输的媒介和身份见证，我们不做价值判断。内容分享是用户行为，不代表本站的观点和立场。若用户分享在本站的内容侵犯了您的权利，请联系
                Bloc42 团队评定删除。
              </Styledp>
            </li>
            <li>
              <Styledh4>11.联系我们</Styledh4>
              <Styledp>邮箱: tao@ethfans.org</Styledp>
            </li>
          </Styledul>
        </Section>
      </Container>
    )
  }
}

export default FaqPage

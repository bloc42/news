import React from 'react'
import styled from 'styled-components'

const StyledStatementArticle = styled.article`
  color: ${props => props.theme.fontColorLight};
  h3 {
    text-align: center;
  }
  p {
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-indent: -2em;
    padding-left: 2em;
  }
`
const Styledul = styled.ul`
  list-style: none;
  margin: 0px;
  padding-left: 2rem;
`

const StatementArticle = props => {
  return (
    <StyledStatementArticle {...props}>
      <h3>Knock注册声明</h3>
      <section>
        <p>
          一、Knock
          是一个区块链社区集合，为了实现将用户的社区行为上链，用户需注册或导入一个以太坊钱包用于创建
          Knock 账号。
        </p>
      </section>
      <section>
        <p>
          二、在通过 Knock
          创建以太坊钱包之前，用户需确保自己明白以太坊钱包的原理。钱包是存储和管理密钥的工具，公私钥产生过程如下：
        </p>
        <Styledul>
          <li>
            a. 创建随机私钥，私钥用于证明用户在以太坊上的身份和更改账户状态。
          </li>
          <li>b. 私钥使用椭圆曲线加密算法推导出公钥，公钥是公开的。</li>
          <li>c. 用单向加密哈希函数从公钥推导出地址，地址用于公开收款。</li>
        </Styledul>
      </section>
      <section>
        <p>
          三、Knock
          不是热钱包，用户可断网创建。在创建后，请将私钥和助记词妥善备份。请不要采用以下方式备份：截图、邮件、记事本、短信、微信、QQ等。我们建议用户在纸质记事本上抄写助记词和私钥。
        </p>
      </section>
      <section>
        <p>
          四、用户可导入已有钱包到
          Knock，钱包的私钥和助记词仅存储在当前这台设备中，不存储在 Knock
          的服务器上。
        </p>
      </section>
      <section>
        <p>
          五、请妥善保管你的私钥和助记词。当用户因保管不慎导致私钥、助记词遗失或被盗时，Knock
          不能帮助恢复或找回，Knock 不承担由此造成的损失。
        </p>
      </section>
      <section>
        <p>
          六、用户用于创建 Knock
          账号的以太坊钱包地址是公开的，与用户在互联网上的身份有一定程度的绑定。若非必要，我们不建议用这个钱包进行大额资产往来。
        </p>
      </section>
      <section>
        <p>
          七、目前版本的 Knock 没有打赏或其他交易功能。任何时候 Knock
          都不会要求用户输入私钥或助记词。
        </p>
      </section>
      <section>
        <p>
          八、通过 Knock 创建的钱包不设钱包密码。用户登录 Knock 的密码仅是 Knock
          社区的登录密码，支持通过邮箱修改和找回。
        </p>
      </section>
    </StyledStatementArticle>
  )
}

export default StatementArticle

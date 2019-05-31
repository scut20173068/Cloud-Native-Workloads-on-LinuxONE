# 关于本银行网络应用Zurich Bank的简介
本应用允许用户网上班里简单的银行业务，如显示账户信息、创建账户、删除账户、存款、取款、账户间转账、转账至理财账户以及从理财账户转账到主账户
为银行方面提供设置基金利率、更新各账户本息和的功能

## 显示账户信息
所有账户信息在标题左下方显示，每条账户信息从左到右分别是选择框、账户名、账户内可用存款、理财账户存款

## 创建账户
在Create Account标题下的Enter account name框内输入新的账户名称并点击按钮“ADD”,即可创建账户并存入数据库中

## 删除账户
点击账户信息前端的选择框，即可将此条记录从数据库中删除

## 存款
在Deposit Money标题下的Enter account name框内输入已创建的账户名
在Enter amount框内输入存款数目
点击“DEPOSIT”按钮，即可在该账户中存入指定的金额

## 取款
在Withdraw Money标题下的Enter account name框内输入已创建的账户名
在Enter amount框内输入取款数目
点击“WITHDRAW”按钮，即可从该账户中取出指定的金额

## 账户间转账
在Transfer Money标题下的Enter account name1框内输入用来转出资金的账户名
在Enter account name2框内输入用来转入资金的账户名
在Enter amount框内输入取款数目
点击“TRANSFER”按钮，即可完成账户间转账

## 转账至理财账户
在Financing Account标题下的Enter account name框内输入已创建的账户名
在Enter amount框内输入取款数目(这里必须是正数)
点击“TRANSFER”按钮，即可完成从主账户到理财账户间的转账

## 从理财账户转账到主账户
在Financing Account标题下的Enter account name框内输入已创建的账户名
在Enter amount框内输入取款数目(这里必须是负数)
点击“TRANSFER”按钮，即可完成从理财账户到主账户间的转账

## 设置基金年利率
在Set Interest标题下的Enter interest rate(%)框中输入指定利率x，点击“SET”按钮，即可设置银行当前的基金年利率为x%

## 显示基金利率
在标题下方显示银行当前的基金利率，默认情况下为5%

## 更新各账户本息和
点击Update Account标题下的“UPDATE”按钮，即可根据当前基金利率更新所有账户的理财账户余额（一次更新相当于一年后的计息）

-----
 App should be running in `localhost:8080`. Additional details in (express-server/README.md)[express-server/README.md] and the repo base README.md files.

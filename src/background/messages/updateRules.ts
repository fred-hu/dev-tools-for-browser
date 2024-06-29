import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { PROXY_ROUTE_ITEM } from "~app/constants"
import { MATCH_TYPE, MOCK_TYPE, PROXY_ROUTE_KEY, ResourceType, RuleActionType } from "~app/constants"
import store, { STORE_KEY } from "~app/utils/store"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const resourceTypes = [
    ResourceType.MAIN_FRAME,
    ResourceType.XMLHTTPREQUEST,
    ResourceType.SCRIPT,
    ResourceType.STYLESHEET,
    ResourceType.SUB_FRAME,
    ResourceType.MEDIA,
    ResourceType.WEBSOCKET,
    ResourceType.OTHER,
    ResourceType.CSP_REPORT,
    ResourceType.FONT,
    ResourceType.IMAGE,
    ResourceType.PING,
    ResourceType.WEBBUNDLE,
    ResourceType.WEBTRANSPORT,
    ResourceType.OBJECT,
  ]

  const routes: PROXY_ROUTE_ITEM[] = (await store.getItem(STORE_KEY.ROUTES)) ?? []
  const config: Record<string, boolean> = await store.getItem(STORE_KEY.GLOBAL_SWITCH_CONFIG) || {}
  const { mock } = config
  const ruleRoutes =
    routes
      .filter(
        (route) =>
          route[PROXY_ROUTE_KEY.MOCK_TYPE] === MOCK_TYPE.REDIRECT ||
          route[PROXY_ROUTE_KEY.MOCK_TYPE] === MOCK_TYPE.MODIFY_HEADERS
      )
      .filter((route) => route[PROXY_ROUTE_KEY.ENABLE] === true) || []
  const oldRules = await chrome.declarativeNetRequest.getDynamicRules()
  const oldRuleIds = oldRules.map((rule) => rule.id)

  const newRules: any[] = ruleRoutes.map((v, i) => {
    let condition = {}
    const isRedirect = v[PROXY_ROUTE_KEY.MOCK_TYPE] === MOCK_TYPE.REDIRECT
    const isModifyHeaders = v[PROXY_ROUTE_KEY.MOCK_TYPE] === MOCK_TYPE.MODIFY_HEADERS
    const matchType = v[PROXY_ROUTE_KEY.MATCH_TYPE]
    if (!v[PROXY_ROUTE_KEY.URL] && !matchType) { // 不限URL
      condition = {
        urlFilter: '*',
        resourceTypes
      }
    }
    if (matchType === MATCH_TYPE.CONTAINS) {
      condition = {
        urlFilter: v[PROXY_ROUTE_KEY.URL],
        resourceTypes
      }
    }
    if (matchType === MATCH_TYPE.EQUALS) {
      condition = {
        regexFilter: `^${v[PROXY_ROUTE_KEY.URL]}$`.replace(/\./g, "\\.").trim(),
        resourceTypes
      }
    }
    if (matchType === MATCH_TYPE.REGEXP) {
      condition = {
        regexFilter: `.*${v[PROXY_ROUTE_KEY.URL]}.*`.replace(/\./g, "\\.").trim(),
        resourceTypes
      }
    }
    if (isRedirect) {
      return {
        id: i + 1,
        priority: 1,
        action: {
          type: RuleActionType.REDIRECT,
          redirect: { url: v[PROXY_ROUTE_KEY.REDIRECT_URL] }
        },
        condition: condition
      }
    }
    if (isModifyHeaders) {
      const requestHeaders = (v?.[PROXY_ROUTE_KEY.REQUEST_HEADERS] ?? []).map((item) => ({
        header: item.key,
        ...(item.operationType === "remove" ? {} : { value: item.value }),
        operation: item.operationType
      }))
      const responseHeaders = (v?.[PROXY_ROUTE_KEY.RESPONSE_HEADERS] ?? []).map((item) => ({
        header: item.key,
        ...(item.operationType === "remove" ? {} : { value: item.value }),
        operation: item.operationType
      }))
      return {
        id: i + 1,
        priority: 1,
        action: {
          type: RuleActionType.MODIFY_HEADERS,
          ...(requestHeaders?.length ? { requestHeaders } : {}),
          ...(responseHeaders?.length ? { responseHeaders } : {})
        },
        condition: condition
      }
    }
  })
  console.log("rules", [...(mock ? newRules : [])])
  const result = await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: oldRuleIds,
    addRules: [...(mock ? newRules : [])]
  })
  res.send({
    result
  })
}

export default handler

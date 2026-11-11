# Firewalls

Klai Studio connects to your FileMaker Server from a fixed set of egress addresses. If a firewall protects that server, allow inbound HTTPS on port `443` from every address below.

A request uses one address. Either address in a region can be the source, and an app can be served from any region, so allow all six.

| Region | Egress addresses |
| --- | --- |
| US West (N. California, `us-west-1`) | `54.193.228.37`, `54.176.201.32` |
| Europe (Paris, `eu-west-3`) | `13.39.139.180`, `15.224.72.244` |
| Asia Pacific (Singapore, `ap-southeast-1`) | `56.10.156.161`, `47.131.163.155` |

::: warning
The [Klai Server Proxy](../apis-and-services/server-proxy.md) is deprecated and will be removed on January 10, 2027. Servers that still have **Use Klai Proxy** checked connect from `54.215.158.200` until that date. That address is separate from the table above. Allow the six egress addresses, then turn the proxy off.
:::

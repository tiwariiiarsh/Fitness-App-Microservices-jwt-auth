package com.fitness.gateway.filter;


//import com.fitness.gateway.utils.JwtUtils;
////import com.javatechie.util.JwtUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.cloud.gateway.filter.GatewayFilter;
//import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.web.server.ServerWebExchange;
//import reactor.core.publisher.Mono;
//
//@Component
//public class AuthenticationFilter
//        extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {
//
//    @Autowired
//    private RouteValidator validator;
//
//    @Autowired
//    private JwtUtils jwtUtil;
//
//    public AuthenticationFilter() {
//        super(Config.class);
//    }
//
//    @Override
//    public GatewayFilter apply(Config config) {
//        return (exchange, chain) -> {
//
//            if (validator.isSecured.test(exchange.getRequest())) {
//
//                // 1️⃣ Authorization header check
//                if (!exchange.getRequest()
//                        .getHeaders()
//                        .containsKey(HttpHeaders.AUTHORIZATION)) {
//
//                    return unauthorized(exchange, "Missing Authorization Header");
//                }
//
//                String authHeader = exchange.getRequest()
//                        .getHeaders()
//                        .getFirst(HttpHeaders.AUTHORIZATION);
//
//                // 2️⃣ Bearer check
//                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                    return unauthorized(exchange, "Invalid Authorization Header");
//                }
//
//                String token = authHeader.substring(7).trim();
//
//                // 3️⃣ Token validation
//                try {
//                    jwtUtil.validateToken(token);
//                } catch (Exception e) {
//                    return unauthorized(exchange, "Invalid or Expired Token");
//                }
//            }
//
//            return chain.filter(exchange);
//        };
//    }
//
//    private Mono<Void> unauthorized(ServerWebExchange exchange, String message) {
//        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
//        return exchange.getResponse().setComplete();
//    }
//
//    public static class Config {
//    }
//}
//
//
//








import com.fitness.gateway.utils.JwtUtils;
//import com.javatechie.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class AuthenticationFilter
        extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private JwtUtils jwtUtil;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {

            if (validator.isSecured.test(exchange.getRequest())) {

                if (!exchange.getRequest().getHeaders()
                        .containsKey(HttpHeaders.AUTHORIZATION)) {
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }

                String authHeader = exchange.getRequest()
                        .getHeaders()
                        .getFirst(HttpHeaders.AUTHORIZATION);

                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }

                String token = authHeader.substring(7);

                try {
                    jwtUtil.validateToken(token);

                    // 🔥 YAHI MAIN FIX HAI
                    String userId = jwtUtil.extractUserId(token);

                    ServerHttpRequest mutatedRequest = exchange.getRequest()
                            .mutate()
                            .header("X-User-ID", userId)
                            .build();

                    return chain.filter(
                            exchange.mutate().request(mutatedRequest).build()
                    );

                } catch (Exception e) {
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }
            }

            return chain.filter(exchange);
        };
    }


    private Mono<Void> unauthorized(ServerWebExchange exchange, String message) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }

    public static class Config {
    }
}
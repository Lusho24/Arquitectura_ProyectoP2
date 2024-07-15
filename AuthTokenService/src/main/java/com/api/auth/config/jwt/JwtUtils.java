package com.api.auth.config.jwt;

import com.api.auth.domain.model.user.CustomUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwt.secret.key}")
    private String secretKey;

    @Value("${jwt.time.expiration}")
    private String timeExpiration;

    // Generar token de acceso
    public String generateAccessToken(CustomUser user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id",user.getId());
        claims.put("name",user.getName());
        claims.put("address",user.getAddress());
        claims.put("phone",user.getPhone());

        return Jwts.builder()
                .subject(user.getUsername())
                .claims(claims)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + Long.parseLong(timeExpiration)))
                .signWith(getSignatureKey())
                .compact();
    }

    // Obtener firma del token
    private SecretKey getSignatureKey(){
        byte [] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    //Validar token de acceso
    public boolean isTokenValid(String token){
        try{
            Jwts.parser()
                    .verifyWith(getSignatureKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        }catch (JwtException e){
            logger.error("ERROR: JWT Inválido.", e);
            return false;
        }
    }

    //Obtener claims del token
    private Claims extractAllClaims(String token){
        return Jwts.parser()
                .verifyWith(getSignatureKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    //Obtener un solo claim del token
    private  <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver){
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    //Obtener un solo claim del token
    public String getEmail(String token){
        return getClaimFromToken(token, Claims::getSubject);
    }

    // Obtener el atributo "id" del token
    public String getNameFromToken(String token) {
        return getClaimFromToken(token, claims -> claims.get("id", String.class));
    }

}

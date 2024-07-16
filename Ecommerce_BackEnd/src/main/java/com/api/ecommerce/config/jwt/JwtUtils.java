package com.api.ecommerce.config.jwt;

import com.api.ecommerce.domain.model.user.CustomUser;
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
import java.util.function.Function;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwt.secret.key}")
    private String secretKey;

    @Value("${jwt.time.expiration}")
    private String timeExpiration;

    // Obtener firma del token
    private SecretKey getSignatureKey(){
        byte [] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    //Validar token de acceso
    public boolean isTokenValid(String token, CustomUser user){
        String email = getEmail(token);
        try{
            Jwts.parser()
                    .verifyWith(getSignatureKey())
                    .build()
                    .parseSignedClaims(token);
            return (email.equals(user.getUsername())) && !isTokenExpired(token);
        }catch (JwtException e){
            logger.error("ERROR: JWT Inválido.", e);
            return false;
        }
    }

    private boolean isTokenExpired(String token){
        return getExpirationFromToken(token).before(new Date());
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

    // Obtener la fecha de expiracion del token
    private Date getExpirationFromToken (String token){
        return getClaimFromToken(token,Claims::getExpiration);
    }

    // Obtener el atributo "id" del token
    public String getNameFromToken(String token) {
        return getClaimFromToken(token, claims -> claims.get("id", String.class));
    }

}

package com.example.todolistapk.UserManagementService.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {
    private static final String SECRET =
            "Q2hhbmdlVGhpc0pXVFNlY3JldEtleVRvQmVBdExlYXN0NjRCeXRlc0xvbmdBbmRTZWN1cmU=";

    private final SecretKey secretKey =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    private static final long EXPIRATION = 1000 * 60 * 60 * 24; // 24h
    private static final String USERID = "userid";

    public String generateToken(String username,Long userID) {
        return Jwts.builder()
                .claim(USERID, userID)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    public String getUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

    }

//    public boolean validateToken(String token) {}

    public Long getUserID(String token) {
        return getClaims(token).get(USERID, Long.class);
    }
}

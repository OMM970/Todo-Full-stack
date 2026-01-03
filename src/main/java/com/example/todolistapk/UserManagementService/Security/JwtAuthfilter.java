package com.example.todolistapk.UserManagementService.Security;

import com.example.todolistapk.UserManagementService.UserEntity.UserEntitiy;
import com.example.todolistapk.UserManagementService.UserRepo.USerRepo;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthfilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final USerRepo userRepo;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String token = header.substring(7);
        String email=jwtUtil.getUsername(token);

        UserEntitiy entitiy = userRepo.findByEmail(email).orElse(null);
        if(entitiy!=null){
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email,null, List.of());
            SecurityContextHolder.getContext().setAuthentication(authentication);

        }
        filterChain.doFilter(request, response);
    }
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();

        return

                path.startsWith("/api/v1/auth/")


                        || path.equals("/")
                        || path.equals("/login.html")
                        || path.equals("/register.html")


                        || path.endsWith(".js")
                        || path.endsWith(".css")
                        || path.endsWith(".png")
                        || path.endsWith(".jpg")
                        || path.endsWith(".svg")
                        || path.equals("/favicon.ico");
    }

}
